import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	// Check if we are in production.
	// Vercel sets NEXT_PUBLIC_VERCEL_ENV to 'production', 'preview', or 'development'
	const isProduction = process.env.NODE_ENV === "production";

	// If NOT production, block everything
	if (!isProduction) {
		return {
			rules: [
				{
					userAgent: "*",
					disallow: "/",
				},
			],
		};
	}

	// If IS production, use your standard rules
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/api/", "/admin/"],
			},
		],
		sitemap: "https://www.j-globalbizschool.com/sitemap.xml",
	};
}
