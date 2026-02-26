import { LINKS } from "@/lib/links";

export function getLink(key: keyof typeof LINKS, lang: string = "ja") {
	const link = LINKS[key];
	if (!link) throw new Error(`Link key "${key}" not found`);

	return link.langUrls?.[lang] || link.url;
}

/**
 * Generate a program link dynamically
 */
export function getProgramLink(programCode: string, lang: string = "ja") {
	const baseUrl = lang === "en" ? "https://fms.j-globalbizschool.com/fmi/webd/IBSApplication?script=JbsPrograms&param=" : "https://fms.j-globalbizschool.com/fmi/webd/IBSApplication?script=JbsProgramsJpn&param=";

	return `${baseUrl}${programCode}`;
}

export function getProgramLinkRegister(programCode: string, lang: string = "ja") {
	const baseUrl = lang === "ja" ? "https://fms.j-globalbizschool.com/fmi/webd/IBSApplication?script=JbsProgramsRegisterJpn&param=" : "https://fms.j-globalbizschool.com/fmi/webd/IBSApplication?script=JbsProgramsRegisterEng&param=";

	return `${baseUrl}${programCode}`;
}
