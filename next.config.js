/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["scontent.fceb1-3.fna.fbcdn.net"],
  }
}

module.exports = nextConfig
