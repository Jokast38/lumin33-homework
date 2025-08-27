export function computeFlashPrice(priceSupplier: number) {
  return Math.round((priceSupplier * 2 * 1.2 + 20) * 100) / 100;
}

export function formatEuro(n: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);
}