import { NextResponse } from 'next/server';

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = (body.name || '').trim();
    const email = (body.email || '').trim();
    const topic = (body.topic || 'Suporte').trim();
    const message = (body.message || '').trim();
    const accept = !!body.accept;

    if (!name || name.length < 2) {
      return NextResponse.json({ error: 'Nome inválido' }, { status: 400 });
    }
    if (!email || !isEmail(email)) {
      return NextResponse.json({ error: 'E-mail inválido' }, { status: 400 });
    }
    if (!message || message.length < 10) {
      return NextResponse.json({ error: 'Mensagem muito curta' }, { status: 400 });
    }
    if (!accept) {
      return NextResponse.json({ error: 'É necessário aceitar a política' }, { status: 400 });
    }

    // TODO: aqui você integra com seu provedor (SendGrid, SES, Resend, HelpDesk, Slack etc.)
    // Exemplo provisório: log
    console.log('[CONTACT]', { name, email, topic, message });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'Erro inesperado' }, { status: 500 });
  }
}
