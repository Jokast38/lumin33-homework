"use client";
import React, { useEffect, useState } from 'react';
import { getHomeSections } from '@/lib/supabase';

export default function BannerScroller() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    async function fetchBanner() {
      const sections = await getHomeSections();
      const strip = sections.find((s) => s.kind === 'strip');
      if (strip && strip.payload?.text) {
        // Découpe le texte en deux messages séparés par '|'
        setMessages(strip.payload.text.split('|').map(m => m.trim()));
      }
    }
    fetchBanner();
  }, []);

  return (
    <div className="banner-scroll-wrapper bg-black">
      <div className="banner-scroll-content text-white text-center py-2 text-sm font-semibold flex flex-row items-center">
        {messages.length > 0 ? (
          <>
            {messages.map((msg, i) => (
              <span style={{ margin: '0 2rem' }} key={i}>{msg}</span>
            ))}
            {/* Répétition pour effet continu */}
            {messages.map((msg, i) => (
              <span style={{ margin: '0 2rem' }} key={i + messages.length}> {msg} </span>
            ))}

            {messages.map((msg, i) => (
              <span style={{ margin: '0 2rem' }} key={i + messages.length * 2}> {msg} </span>
            ))}

            {messages.map((msg, i) => (
              <span style={{ margin: '0 2rem' }} key={i + messages.length * 3}> {msg} </span>
            ))}

            {messages.map((msg, i) => (
              <span style={{ margin: '0 2rem' }} key={i + messages.length * 4}> {msg} </span>
            ))}
          </>
        ) : (
          <span style={{ margin: '0 2rem' }}>Chargement...</span>
        )}
      </div>
    </div>
  );
}
