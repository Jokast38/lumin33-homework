'use client';
import { useCart } from './CartProvider';

export default function CartPage() {
  const { items, addItem, removeItem, clear } = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const router = require('next/navigation').useRouter();
  return (
    <main className="cart-main">
      <h1 className="cart-title">Mon Panier</h1>
      {items.length === 0 ? (
        <div className="cart-empty">Votre panier est vide.</div>
      ) : (
        <>
          <ul className="cart-list" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {items.map(i => (
              <li key={i.id} className="cart-list-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', width: '100%', maxWidth: '480px', marginBottom: '1rem' }}>
                <img
                  src={i.images?.[0] ?? '/default-product.png'}
                  alt={i.name}
                  className="cart-product-img"
                  style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '0.5rem', border: '1px solid #ccc', background: '#f5f5f5' }}
                />
                <span className="cart-product-name">{i.name}</span>
                <button className="cart-qty-btn" onClick={() => addItem({ ...i, qty: 1 })}>+</button>
                <span>{i.qty}</span>
                <button className="cart-qty-btn" onClick={() => addItem({ ...i, qty: -1 })} disabled={i.qty <= 1}>-</button>
                <span>{(i.price * i.qty).toFixed(2)} €</span>
                <button className="cart-remove-btn" onClick={() => removeItem(i.id)}>Retirer</button>
              </li>
            ))}
          </ul>
          <div className="cart-total">Total : {total.toFixed(2)} €</div>
        </>
      )}
      <div className="cart-option">
        <button className="cart-remove-btn" onClick={clear}>Vider le panier</button>
        <button className="cart-order-btn" onClick={() => router.push('/checkout')}>Commander</button>
      </div>
    </main>
  );
}
