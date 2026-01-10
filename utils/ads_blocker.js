// utils/adsBlocker.js
export async function blockAds(page) {
  await page.route('**/*', route => {
    const url = route.request().url();

    // Lista de dominios/patrones comunes de anuncios y trackers
    const bloqueados = [
      'doubleclick.net',
      'googlesyndication.com',
      'adservice.google.com',
      'facebook.net',
      'analytics',
      'ads'
    ];

    if (bloqueados.some(pattern => url.includes(pattern))) {
      route.abort(); // Bloquea la request
    } else {
      route.continue(); // Deja pasar el resto
    }
  });
}
