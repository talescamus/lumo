// lib/crypto.ts
import crypto from 'crypto';

function getMasterKey(): Buffer {
  const raw = process.env.MASTER_KEY;
  if (!raw) throw new Error('MASTER_KEY ausente');
  // aceita base64 ou hex
  try {
    const b64 = Buffer.from(raw, 'base64');
    if (b64.length === 32) return b64;
  } catch {}
  const hex = Buffer.from(raw, 'hex');
  if (hex.length === 32) return hex;
  throw new Error('MASTER_KEY inválida: espere 32 bytes (base64/hex)');
}

const KEY = getMasterKey();

/** AES-256-GCM: retorna v1:<iv_b64>:<ct_b64>:<tag_b64> */
export function encrypt(plaintext: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', KEY, iv);
  const ct = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `v1:${iv.toString('base64')}:${ct.toString('base64')}:${tag.toString('base64')}`;
}

export function decrypt(token: string): string {
  const [v, ivB64, ctB64, tagB64] = token.split(':');
  if (v !== 'v1') throw new Error('Versão de cipher desconhecida');
  const iv = Buffer.from(ivB64, 'base64');
  const ct = Buffer.from(ctB64, 'base64');
  const tag = Buffer.from(tagB64, 'base64');
  const decipher = crypto.createDecipheriv('aes-256-gcm', KEY, iv);
  decipher.setAuthTag(tag);
  const pt = Buffer.concat([decipher.update(ct), decipher.final()]);
  return pt.toString('utf8');
}

export function fingerprint(value: string): string {
  return crypto.createHash('sha256').update(value, 'utf8').digest('base64');
}

export function maskKey(v: string, start = 4, end = 4) {
  if (!v) return '';
  if (v.length <= start + end) return '•'.repeat(v.length);
  return v.slice(0, start) + '•'.repeat(v.length - start - end) + v.slice(-end);
}
