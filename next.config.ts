import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	trailingSlash: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "www.j-globalbizschool.com",
			},
		],
	},
	async headers() {
		const isProduction = process.env.NODE_ENV === "production";

		// 2. Define our base headers
		const securityHeaders = [
			{
				key: "X-Frame-Options",
				value: "DENY",
			},
			{
				key: "X-Content-Type-Options",
				value: "nosniff",
			},
		];

		// 3. If NOT production, add the "No Index" instruction for bots
		if (!isProduction) {
			securityHeaders.push({
				key: "X-Robots-Tag",
				value: "noindex, nofollow, noarchive, nosnippet",
			});
		}

		return [
			{
				source: "/(.*)",
				headers: securityHeaders,
			},
		];
	},
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
