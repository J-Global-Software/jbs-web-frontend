const logos = [
	{ src: "/img/adidas.avif", alt: "Adidas" },
	{ src: "/img/fujitsu.jpg", alt: "Fujitsu" },
	{ src: "/img/disney.png", alt: "Disney" },
	{ src: "/img/gsk.png", alt: "GlaxoSmithKline" },
	{ src: "/img/hitachi.png", alt: "Hitachi" },
	{ src: "/img/kawasaki.avif", alt: "Kawasaki" },
	{ src: "/img/jcb.png", alt: "JCB" },
	{ src: "/img/konami.png", alt: "Konami" },
	{ src: "/img/olympus.avif", alt: "Olympus" },
	{ src: "/img/oracle.avif", alt: "Oracle" },
];

export default function ClientLogos() {
	return (
		<section className="py-12 px-4">
			<h2 className="text-center text-lg md:text-xl font-medium text-gray-800 mb-10">J-Globalがサービスを提供した企業様の一部（順不同）</h2>

			<div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
				{logos.map((logo) => (
					<div key={logo.alt} className="flex items-center justify-center">
						<img src={logo.src} alt={logo.alt} className="object-contain h-16" />
					</div>
				))}
			</div>
		</section>
	);
}
