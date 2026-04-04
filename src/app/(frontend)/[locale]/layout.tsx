import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "@/app/globals.css";
import Aoscompo from "../utils/aos";
import { Noto_Sans, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import { GoogleAnalytics } from "@next/third-parties/google";

const poppins = Poppins({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-main", // 3. Give it a clear variable name
});

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		<html lang={locale} className={poppins.variable}>
			{/* The className here applies Noto Sans to the whole page */}
			<body className={poppins.className}>
				<NextIntlClientProvider locale={locale}>
					<Aoscompo>{children}</Aoscompo>
				</NextIntlClientProvider>
				<Toaster richColors closeButton />
			</body>
			<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
		</html>
	);
}
