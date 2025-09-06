import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { encrypt, fingerprint, maskKey } from '@/lib/crypto';
import { sendNewKeyEmail } from '@/lib/resend';
import { z } from 'zod';

// (plugue sua auth futuramente)
function getUserId() {
  return null as string | null;
}

const CreateSchema = z.object({
  exchange: z.enum(['binance', 'bybit']),
  label: z.string().min(2),
  apiKey: z.string().min(8),
  secretKey: z.string().min(8),
  permission: z.enum(['read', 'trade']),
  otp: z.string().optional(), // validar TOTP em produção
});

const PatchSchema = z.object({
  id: z.string().cuid(),
  active: z.boolean().optional(),
  permission: z.enum(['read', 'trade']).optional(),
  label: z.string().min(2).optional(),
  // optional rotation
  apiKey: z.string().min(8).optional(),
  secretKey: z.string().min(8).optional(),
});

export async function GET() {
  const userId = getUserId();
  const keys = await prisma.apiKey.findMany({
    where: { userId: userId ?? undefined },
    orderBy: { createdAt: 'desc' },
  });

  // nunca devolva secrets; também não descriptografe aqui
  const safe = keys.map((k: { id: any; exchange: any; label: any; permission: any; active: any; createdAt: { toISOString: () => any; }; updatedAt: { toISOString: () => any; }; }) => ({
    id: k.id,
    exchange: k.exchange,
    label: k.label,
    apiKey: '***', // opcional: não retornar; a UI já mostra a máscara local
    permission: k.permission,
    active: k.active,
    createdAt: k.createdAt.toISOString(),
    updatedAt: k.updatedAt.toISOString(),
  }));

  return NextResponse.json({ items: safe });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = CreateSchema.parse(body);

    const exchange = parsed.exchange.toUpperCase() as 'BINANCE' | 'BYBIT';
    const permission = parsed.permission.toUpperCase() as 'READ' | 'TRADE';

    // fingerprint para deduplicar por exchange
    const fp = fingerprint(parsed.apiKey);

    // cria registro + versão inicial (v1)
    const apiKeyEnc = encrypt(parsed.apiKey);
    const secretEnc = encrypt(parsed.secretKey);

    const created = await prisma.apiKey.create({
      data: {
        userId: getUserId(),
        exchange,
        label: parsed.label,
        apiKeyEnc,
        secretEnc,
        permission,
        active: true,
        fingerprint: fp,
        versions: {
          create: {
            version: 1,
            apiKeyEnc,
            secretEnc,
          },
        },
      },
      include: { versions: true },
    });

    // notifica suporte (sem segredos)
    await sendNewKeyEmail({
      exchange,
      label: created.label,
      apiKeyMask: maskKey(parsed.apiKey),
      permission,
      createdAt: created.createdAt.toISOString(),
    });

    return NextResponse.json(
      {
        item: {
          id: created.id,
          exchange: created.exchange,
          label: created.label,
          apiKey: '***',
          permission: created.permission,
          active: created.active,
          createdAt: created.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (e: any) {
    const msg = e?.issues?.[0]?.message || e?.message || 'Erro';
    const code = msg?.includes('fingerprint') ? 409 : 400;
    return NextResponse.json({ error: msg }, { status: code });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const parsed = PatchSchema.parse(body);

    const current = await prisma.apiKey.findUnique({ where: { id: parsed.id } });
    if (!current) return NextResponse.json({ error: 'Chave não encontrada' }, { status: 404 });

    const data: any = {};
    if (typeof parsed.active === 'boolean') data.active = parsed.active;
    if (parsed.permission) data.permission = parsed.permission.toUpperCase();
    if (parsed.label) data.label = parsed.label;

    // Rotação de chave (gera nova versão)
    if (parsed.apiKey && parsed.secretKey) {
      const apiKeyEnc = encrypt(parsed.apiKey);
      const secretEnc = encrypt(parsed.secretKey);

      // incrementa versão
      const lastVersion = await prisma.apiKeyVersion.findFirst({
        where: { apiKeyId: current.id },
        orderBy: { version: 'desc' },
        select: { version: true },
      });
      const nextVersion = (lastVersion?.version || 0) + 1;

      data.apiKeyEnc = apiKeyEnc;
      data.secretEnc = secretEnc;
      data.fingerprint = fingerprint(parsed.apiKey);

      await prisma.$transaction([
        prisma.apiKey.update({ where: { id: current.id }, data }),
        prisma.apiKeyVersion.create({
          data: {
            apiKeyId: current.id,
            version: nextVersion,
            apiKeyEnc,
            secretEnc,
            rotatedBy: getUserId() ?? undefined,
          },
        }),
      ]);

      return NextResponse.json({ ok: true });
    }

    await prisma.apiKey.update({ where: { id: current.id }, data });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    const msg = e?.issues?.[0]?.message || e?.message || 'Erro';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id obrigatório' }, { status: 400 });

  const exists = await prisma.apiKey.findUnique({ where: { id } });
  if (!exists) return NextResponse.json({ error: 'Chave não encontrada' }, { status: 404 });

  // Em produção: considere soft-delete (deletedAt) + auditoria
  await prisma.apiKey.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
