'use client';
import { fbq } from '@/lib/fbq';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Item = { id: string; name: string; price: number; qty: number; images?: string[] };
type AddableItem = { id: string; name: string; price: number; qty?: number; images?: string[] }; // entrée plus souple

type CartCtx = {
  isCartReady: boolean;
  items: Item[];
  addItem: (i: AddableItem) => void;        // <-- accepte qty? et champs requis
  removeItem: (id: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart');
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items, ready]);

  const addItem = (i: AddableItem) => {
    setItems(prev => {
      const exists = prev.find(p => p.id === i.id);
      if (exists) {
        return prev.map(p => p.id === i.id ? { ...p, qty: (p.qty ?? 1) + (i.qty ?? 1) } : p);
      }
      return [...prev, { ...i, qty: i.qty ?? 1 }];
    });
    // Tracking Meta Pixel AddToCart
    if (typeof window !== 'undefined' && i) {
      fbq('track', 'AddToCart', {
        content_ids: [i.id],
        value: i.price ?? 0,
        currency: 'EUR',
      });
    }
  };

  const value = useMemo<CartCtx>(() => ({
    isCartReady: ready,
    items,
    addItem,
    removeItem: (id) => setItems(prev => prev.filter(p => p.id !== id)),
    clear: () => setItems([]),
  }), [items, ready]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}