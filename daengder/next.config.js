/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	trailingSlash: true,
	generateBuildId: () => 'dangder',
	exportPathMap: () => ({
		'/': { page: '/' },
		'/404': { page: '/404' },
	}),
};

module.exports = nextConfig;
