/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  generateBuildId: () => "dangder",
  exportPathMap: () => ({
    "/": { page: "/" },
    "/test": { page: "/test" },
    "/404": { page: "/404" },
  }),
};

module.exports = nextConfig;
