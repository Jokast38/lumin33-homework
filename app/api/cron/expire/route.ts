export async function POST() {
  // Ici tu mettrais un UPDATE en DB:
  // update products set price_flash=null, flash_ends_at=null where flash_ends_at < now();
  console.log('[cron] expire flash prices (mock)');
  return Response.json({ ok: true });
}