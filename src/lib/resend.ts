// lib/resend.ts
import { Resend } from 'resend';
import { maskKey } from './crypto';

const resend = new Resend(process.env.RESEND_API_KEY || '');

type NewKeyEmail = {
  exchange: 'BINANCE' | 'BYBIT';
  label: string;
  apiKeyMask: string;
  permission: 'READ' | 'TRADE';
  createdAt: string;
};

export async function sendNewKeyEmail(data: NewKeyEmail) {
  const to = process.env.SUPPORT_TEAM_EMAIL!;
  if (!to || !process.env.RESEND_API_KEY) return;

  const subject = `Nova chave API adicionada — ${data.exchange} (${data.permission})`;
  const html = `
    <div style="font-family:system-ui,Segoe UI,Arial;">
      <h2>Nova chave API</h2>
      <p><b>Exchange:</b> ${data.exchange}</p>
      <p><b>Rótulo:</b> ${data.label}</p>
      <p><b>API Key:</b> ${data.apiKeyMask}</p>
      <p><b>Permissão:</b> ${data.permission}</p>
      <p><b>Criada em:</b> ${new Date(data.createdAt).toLocaleString()}</p>
      <hr />
      <p>Admin: ${process.env.APP_BASE_URL || ''}/admin/integracoes</p>
      <small>Nenhum segredo é enviado por e-mail.</small>
    </div>
  `;

  await resend.emails.send({
    from: 'Lumo Notifier <no-reply@lumo.app>',
    to,
    subject,
    html,
  });
}
