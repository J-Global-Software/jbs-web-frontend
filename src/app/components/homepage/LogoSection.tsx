import React from "react";

const LogoSection: React.FC = () => {
	return (
		<section className="bg-white">
			<div className="py-8 lg:py-12 mx-auto max-w-screen-xl px-4">
				<div className="grid grid-cols-2 gap-8 sm:gap-8 md:grid-cols-3 lg:grid-cols-10 justify-items-center">
					<a href="#" className="flex justify-center items-center">
						<img src="/img/adidas.png" alt="Logo 1" className="h-7 md:h-9 object-contain filter grayscale opacity-70 hover:opacity-80 transition" />
					</a>
					<a href="#" className="flex justify-center items-center">
						<img src="/img/fujitsu.png" alt="Logo 2" className="h-7 md:h-9 object-contain filter grayscale opacity-70 hover:opacity-80 transition" />
					</a>
					<a href="#" className="flex justify-center items-center">
						<img src="/img/disney.jpg" alt="Logo 1" className="h-7 md:h-9 object-contain filter grayscale opacity-70 hover:opacity-80 transition" />
					</a>
					<a href="#" className="flex justify-center items-center">
						<img src="/img/gsk.png" alt="Logo 3" className="h-7 md:h-9 object-contain filter grayscale opacity-70 hover:opacity-80 transition" />
					</a>
					<a href="#" className="flex justify-center items-center">
						<img src="/img/hitachi.png" alt="Logo 3" className="h-7 md:h-9 object-contain filter grayscale opacity-70 hover:opacity-80 transition" />
					</a>
					<a href="#" className="flex justify-center items-center">
						<img src="/img/kawasaki.png" alt="Logo 3" className="h-7 md:h-9 object-contain filter grayscale opacity-70 hover:opacity-80 transition" />
					</a>
					<a href="#" className="flex justify-center items-center">
						<img src="/img/jcb.png" alt="Logo 3" className="h-7 md:h-9 object-contain filter grayscale opacity-70 hover:opacity-80 transition" />
					</a>
					<a href="#" className="flex justify-center items-center">
						<img src="/img/konami.png" alt="Logo 3" className="h-6 md:h-9 object-contain filter grayscale opacity-70 hover:opacity-80 transition" />
					</a>
					<a href="#" className="flex justify-center items-center">
						<img src="/img/olympus.png" alt="Logo 3" className="h-7 md:h-9 object-contain filter grayscale opacity-70 hover:opacity-80 transition" />
					</a>
					<a href="#" className="flex justify-center items-center">
						<img src="/img/oracle.png" alt="Logo 3" className="h-3 md:h-5 object-contain filter grayscale opacity-70 hover:opacity-80 transition" />
					</a>

					{/* Add more logos as needed */}
				</div>
			</div>
		</section>
	);
};

export default LogoSection;
