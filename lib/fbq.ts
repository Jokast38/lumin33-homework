// lib/fbq.ts
export const fbq = (...args: any[]) => {
  if (typeof window === 'undefined' || !(window as any).fbq) return;
  (window as any).fbq(...args);
};
