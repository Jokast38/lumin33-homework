"use client";
import { useCart } from '@/components/cart/CartProvider';
import { useState } from 'react';
import './checkout.css';

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const [paid, setPaid] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '', zip: '', city: '', country: ''
  });
  const [payment, setPayment] = useState('card');

  if (paid) {
    return (
      <main className="checkout-main">
        <h1 className="checkout-title">Merci pour votre commande !</h1>
        <p>Votre paiement a été validé. Vous recevrez un email de confirmation.</p>
      </main>
    );
  }

  return (
    <main className="checkout-main">
      <h1 className="checkout-title">Saisissez votre adresse de livraison</h1>
      <form className="checkout-form" autoComplete="off" onSubmit={e => { e.preventDefault(); setPaid(true); clear(); }}>
        <div className="checkout-form-row">
          <div style={{ flex: 1 }}>
            <label>Prénom</label>
            <input type="text" required value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} />
          </div>
          <div style={{ flex: 1 }}>
            <label>Nom</label>
            <input type="text" required value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} />
          </div>
        </div>
        <div className="checkout-form-row">
          <div style={{ flex: 1 }}>
            <label>Email</label>
            <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          <div style={{ flex: 1 }}>
            <label>Téléphone</label>
            <input type="tel" required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
          </div>
        </div>
        <div style={{ gridColumn: '1/3' }}>
          <label>Adresse</label>
          <input type="text" required value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
        </div>
        <div className="checkout-form-row">
          <div style={{ flex: 1 }}>
            <label>Code postal</label>
            <input type="text" required value={form.zip} onChange={e => setForm(f => ({ ...f, zip: e.target.value }))} />
          </div>
          <div style={{ flex: 1 }}>
            <label>Ville</label>
            <input type="text" required value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
          </div>
          <div style={{ flex: 1 }}>
            <label>Pays</label>
            <select required value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))}>
              <option value="">Choisissez un pays</option>
              <option value="France">France</option>
              <option value="Belgique">Belgique</option>
              <option value="Suisse">Suisse</option>
              <option value="Luxembourg">Luxembourg</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
        </div>
        <div style={{ gridColumn: '1/3', marginTop: 24 }}>
          <div className="checkout-total">Total : {total.toFixed(2)} €</div>
        </div>
        <div style={{ gridColumn: '1/3', marginTop: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 8, textAlign: 'center', fontSize: '1.1rem' }}>Mode de paiement</div>
          <div className="checkout-payment-choices">
            <label className={`checkout-payment-choice${payment === 'card' ? ' selected' : ''}`}>
              <input type="radio" name="payment" value="card" checked={payment === 'card'} onChange={() => setPayment('card')} />
              <span className="payment-icon">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Credit_card_icon.png" alt="Carte" style={{ width: 32, height: 32, objectFit: 'contain' }} />
              </span>
              <span>Carte bancaire</span>
            </label>
            <label className={`checkout-payment-choice${payment === 'paypal' ? ' selected' : ''}`}>
              <input type="radio" name="payment" value="paypal" checked={payment === 'paypal'} onChange={() => setPayment('paypal')} />
              <span className="payment-icon">
                <img src="https://i.pinimg.com/1200x/f4/22/30/f42230e621c19fea5815dde7a09ed83c.jpg" alt="PayPal" style={{ width: 32, height: 32, objectFit: 'contain' }} />
              </span>
              <span>PayPal</span>
            </label>
            <label className={`checkout-payment-choice${payment === 'applepay' ? ' selected' : ''}`}>
              <input type="radio" name="payment" value="applepay" checked={payment === 'applepay'} onChange={() => setPayment('applepay')} />
              <span className="payment-icon">
                <img src="https://i.pinimg.com/1200x/e7/79/55/e779557a84e186b3d8adeabaa17eecf2.jpg" alt="Apple Pay" style={{ width: 32, height: 32, objectFit: 'contain' }} />
              </span>
              <span>Apple Pay</span>
            </label>
          </div>
        </div>
        <div className="checkout-form-actions">
          <button type="button" className="checkout-back-btn" onClick={() => window.history.back()}>Retour</button>
          <button type="submit" className="checkout-pay-btn">Régler votre commande</button>
        </div>
      </form>
    </main>
  );
}
