/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  generateBuildId: () => "dangder",
  exportPathMap: () => ({
    "/": { page: "/" },
    "/test": { page: "/test" },
    "/404": { page: "/404" },
  }),
};

module.exports = nextConfig;
