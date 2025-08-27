export function loadPixel(pixelId: string) {
  if (!pixelId) return;
  if (typeof window === 'undefined') return;
  // évite double init
  // @ts-ignore
  if (window.fbq) return;

  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode!.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  // @ts-ignore
  window.fbq('init', pixelId);
}

export function trackPixel(event: string, data: any, event_id?: string) {
  // @ts-ignore
  window.fbq?.('track', event, data, event_id ? { eventID: event_id } : undefined);
}