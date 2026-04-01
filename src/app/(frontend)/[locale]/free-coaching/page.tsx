// app/[locale]/free-coaching/page.tsx
"use server";
import { generatePageMetadata } from "@/lib/seo";
import type { ResolvingMetadata } from "next";
import FreeCoachingClient from "./FreeCoachingClient";
import { AppLocale } from "@/i18n/config";

const PATHNAME = "/free-coaching";

export async function generateMetadata(props: { params: Promise<{ locale: AppLocale }> }, parent: ResolvingMetadata) {
	return generatePageMetadata(props, parent, "seo", PATHNAME);
}

export default async function Page() {
	return <FreeCoachingClient />;
}
