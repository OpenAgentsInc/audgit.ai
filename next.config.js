/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  images: {
    domains: ["liveblocks.io"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
