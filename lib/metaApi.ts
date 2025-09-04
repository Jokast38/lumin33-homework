// lib/metaApi.ts
// Hash SHA-256 côté client
async function sha256(text: string) {
  const buf = new TextEncoder().encode(text.trim().toLowerCase());
  const hash = await window.crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function trackMetaEvent(event: string, params: any) {
  // Ajout des infos client hashées
  const user_data: any = {};
  if (params.email) user_data.em = [await sha256(params.email)];
  if (params.phone) user_data.ph = [await sha256(params.phone)];
  if (params.firstName) user_data.fn = [await sha256(params.firstName)];
  if (params.lastName) user_data.ln = [await sha256(params.lastName)];
  if (params.fbp) user_data.fbp = params.fbp;
  if (params.fbc) user_data.fbc = params.fbc;
  if (params.external_id) user_data.external_id = params.external_id;
  user_data.client_user_agent = params.client_user_agent;

  try {
    await fetch('/api/meta/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...params, user_data }),
    });
  } catch (e) {
    // Optionnel : log ou gestion d'erreur
    console.error('Meta API error:', e);
  }
}
