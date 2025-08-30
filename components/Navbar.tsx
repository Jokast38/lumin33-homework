"use client";
import Link from "next/link";
import CartIcon from "@/components/cart/CartIcon";
import { MOCK_PRODUCT } from "@/lib/supabase";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link href="/faq">Foire Aux Questions (FAQ)</Link>
        <Link href="/about">À propos de nous</Link>
        <Link href="/contact">Contactez-nous</Link>
      </div>
      <div className="navbar-logo" >
        <Link href="/fr/home">
          <img src={MOCK_PRODUCT.logo} alt="Logo" className="navbar-logo-img" />
        </Link>
        LUMIN 33
      </div>
      <div className="navbar-actions">
        <button className="navbar-action-btn" title="Rechercher">
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>
        <button className="navbar-action-btn" title="Mon compte">
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7.5 7.5 0 0 1 13 0"/></svg>
        </button>
        <CartIcon />
      </div>
    </nav>
  );
}

