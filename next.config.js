/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['uploads.mangadex.org'],
    minimumCacheTTL: 60,  
  },
  productionBrowserSourceMaps: true,
}

module.exports = nextConfig;
