import { createHmac } from 'node:crypto';

/** HMAC SHA-256 hex */
export function hmacSha256Hex(input: string, secret: string) {
  return createHmac('sha256', secret).update(input, 'utf8').digest('hex');
}

/** Concatène les valeurs avec `+` ; null/undefined -> '' */
export function canonicalJoin(values: (string | number | null | undefined)[]) {
  return values.map((v) => (v ?? '')).join('+');
}