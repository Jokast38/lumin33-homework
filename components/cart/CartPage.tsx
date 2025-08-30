'use client';
import { useCart } from './CartProvider';

export default function CartPage() {
  const { items, addItem, removeItem, clear } = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mon Panier</h1>
      {items.length === 0 ? (
        <div className="text-gray-500">Votre panier est vide.</div>
      ) : (
        <>
          <ul className="mb-6">
            {items.map(i => (
              <li key={i.id} className="flex items-center gap-3 mb-3 border-b pb-2">
                <span className="font-semibold">{i.name}</span>
                <button className="product-cart-qty-btn" onClick={() => addItem({ ...i, qty: 1 })}>+</button>
                <span>{i.qty}</span>
                <button className="product-cart-qty-btn" onClick={() => addItem({ ...i, qty: -1 })} disabled={i.qty <= 1}>-</button>
                <span>{(i.price * i.qty).toFixed(2)} €</span>
                <button className="product-cart-remove px-2 text-red-600" onClick={() => removeItem(i.id)}>Retirer</button>
              </li>
            ))}
          </ul>
          <div className="text-lg font-bold mb-4">Total : {total.toFixed(2)} €</div>
        </>
      )}
      <div className="cart-option">
        <button className="product-cart-remove px-2 text-red-600" onClick={clear}>Vider le panier</button>
        <button className="px-4 py-2 bg-green-600 text-white rounded">Commander</button>
      </div>
    </main>
  );
}
