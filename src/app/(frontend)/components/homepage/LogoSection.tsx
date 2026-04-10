import React from "react";

const logos = [
	{ src: "/img/adidas.png", alt: "Logo 1", className: "h-5 sm:h-7 md:h-9" },
	{ src: "/img/fujitsu.png", alt: "Logo 2", className: "h-5 sm:h-7 md:h-9" },
	{ src: "/img/disney.jpg", alt: "Logo 1", className: "h-5 sm:h-7 md:h-9" },
	{ src: "/img/gsk.png", alt: "Logo 3", className: "h-5 sm:h-7 md:h-9" },
	{ src: "/img/hitachi.png", alt: "Logo 3", className: "h-5 sm:h-7 md:h-9" },
	{ src: "/img/kawasaki.png", alt: "Logo 3", className: "h-5 sm:h-7 md:h-9" },
	{ src: "/img/jcb.png", alt: "Logo 3", className: "h-5 sm:h-7 md:h-9" },
	{ src: "/img/konami.png", alt: "Logo 3", className: "h-4 sm:h-6 md:h-9" },
	{ src: "/img/olympus.png", alt: "Logo 3", className: "h-5 sm:h-7 md:h-9" },
	{ src: "/img/oracle.png", alt: "Logo 3", className: "h-3 sm:h-4 md:h-5" },
];

const LogoSection: React.FC = () => {
	const mainLogos = logos.slice(0, 9);
	const oracleLogo = logos[9];

	return (
		<section className="bg-white">
			<div className="mx-auto max-w-screen-xl px-4 pt-6 pb-2 sm:pt-8 sm:pb-4 lg:pt-10 lg:pb-6">
				<div className="grid grid-cols-3 justify-items-center gap-x-6 gap-y-6 sm:grid-cols-4 sm:gap-8 md:grid-cols-5 lg:grid-cols-10">
					{mainLogos.map((logo) => (
						<a key={logo.src} href="#" className="flex min-h-10 w-full items-center justify-center">
							<img src={logo.src} alt={logo.alt} className={`${logo.className} object-contain filter grayscale opacity-70 transition hover:opacity-80`} />
						</a>
					))}
					<a href="#" className="col-span-3 flex min-h-10 w-full items-center justify-center sm:col-span-1">
						<img src={oracleLogo.src} alt={oracleLogo.alt} className={`${oracleLogo.className} object-contain filter grayscale opacity-70 transition hover:opacity-80`} />
					</a>
				</div>
			</div>
		</section>
	);
};

export default LogoSection;
