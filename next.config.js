/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['uploads.mangadex.org'],
    minimumCacheTTL: 60,  
  },
  swcMinify:true,
}

module.exports = nextConfig;
