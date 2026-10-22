/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF first (≈20% smaller than WebP), WebP fallback; Next negotiates per browser.
    formats: ['image/avif', 'image/webp'],
  },
  // Legal pages exist in English only; the localized footer links to /fr|es/... → send them there.
  async redirects() {
    return [
      { source: '/:locale(fr|es)/:page(terms|privacy|cookies)', destination: '/:page', permanent: true },
    ];
  },
};

export default nextConfig;
