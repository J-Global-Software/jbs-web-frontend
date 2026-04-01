import { withPayload } from "@payloadcms/next/withPayload";
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	reactStrictMode: true,

	// ✅ Forces `/page/en/` instead of `/page/en`
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
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
				],
			},
		];
	},
};

const withNextIntl = createNextIntlPlugin();
export default withPayload(withNextIntl(nextConfig));
