"use client";
import React, { useState } from "react";
import { getHomeSections } from "@/lib/supabase";

export default function ProductSearch({ onSelect }: { onSelect?: (product: any) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [show, setShow] = useState(false);

  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    if (value.length < 2) {
      setResults([]);
      return;
    }
    // Simule une recherche dans les produits des sections home
    const sections = await getHomeSections();
    const products = sections
      .filter(s => s.kind === "grid")
      .flatMap(s => s.payload.products ?? []);
    const filtered = products.filter((p: any) =>
      p.name.toLowerCase().includes(value.toLowerCase()) ||
      p.brand?.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  }

  function handleSelect(product: any) {
    setQuery("");
    setResults([]);
    setShow(false);
    onSelect?.(product);
  }

  return (
    <div className="product-search-container" style={{ backgroundColor: "white", position: "relative", maxWidth: 600, margin: "2rem auto" }}>
      <input
        type="text"
        className="product-search-input"
        placeholder="Recherche"
        value={query}
        onChange={handleSearch}
        onFocus={() => setShow(true)}
        style={{ width: "100%", padding: "0.8em 2.5em 0.8em 1em", borderRadius: "0.8em", border: "1px solid #0c0c0cff", fontSize: "1.1em", backgroundColor: "white" , color: "#060606ff"}}
      />
      <span style={{ position: "absolute", right: 40, top: 16, color: "#060606ff" }}>
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      </span>
      {query && (
        <span style={{ position: "absolute", right: 12, top: 16, color: "#c40505ff", cursor: "pointer" }} onClick={() => { setQuery(""); setResults([]); }}>
          X
        </span>
      )}
      {show && results.length > 0 && (
        <ul className="product-search-results" style={{ position: "absolute", left: 0, right: 0, top: 48, background: "#fff", border: "1px solid #eee", borderRadius: "0.8em", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", zIndex: 10, maxHeight: 260, overflowY: "auto", listStyle: "none", margin: 0, padding: "0.5em 0" }}>
          {results.map((p) => (
            <li key={p.id} style={{ padding: "0.7em 1em", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }} onClick={() => handleSelect(p)}>
              <img src={p.images?.[0]} alt={p.name} style={{ width: 38, height: 38, objectFit: "cover", borderRadius: 8, border: "1px solid #eee" }} />
              <span style={{ fontWeight: 500 }}>{p.name}</span>
              <span style={{ color: "#888", fontSize: "0.95em" }}>{p.brand}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
