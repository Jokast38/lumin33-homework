"use client";
import { useCart } from "./CartProvider";

export default function CartIcon() {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  return (
    <a href="/cart" title="Voir le panier" className="relative">
      {count > 0 && (
        <span className="navbar-badge">
          {count}
        </span>
      )}
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61l1.38-7.39H6" />
      </svg>
    </a>
  );
}
