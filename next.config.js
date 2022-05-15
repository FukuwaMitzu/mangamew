/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['uploads.mangadex.org'],
    minimumCacheTTL: 60,  
  },
  swcMinify:true,
}

module.exports = nextConfig;
