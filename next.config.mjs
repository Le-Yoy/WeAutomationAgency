/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF first (≈20% smaller than WebP), WebP fallback; Next negotiates per browser.
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
