'use client';
import { useEffect, useState } from 'react';

export default function Timer({ endsAt }: { endsAt: string }) {
  const [left, setLeft] = useState<number>(() => new Date(endsAt).getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setLeft(new Date(endsAt).getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [endsAt]);
  if (!Number.isFinite(left)) return null;
  if (left <= 0) return <span>Offre expirée</span>;
  const s = Math.floor(left / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return <span>{h}h {m}m {sec}s</span>;
}