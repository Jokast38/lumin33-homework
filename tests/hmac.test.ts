import { describe, it, expect } from 'vitest';
import { hmacSha256Hex, canonicalJoin } from '../lib/hmac';

describe('hmac', () => {
  it('computes known value', () => {
    const base = canonicalJoin(['1000', 'ORD123']);
    const out = hmacSha256Hex(base, 'secret');
    expect(out).toBe('4de377bd23abe6852b6a22a84d04e51b8284eafafb50c6473ce69c81e3b527be');
  });
});