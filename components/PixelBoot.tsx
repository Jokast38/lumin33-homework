'use client';

import { useEffect } from 'react';
import { loadPixel } from '@/lib/meta';

export default function PixelBoot() {
  const id = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';
  useEffect(() => {
    loadPixel(id);
  }, [id]);
  return null;
}