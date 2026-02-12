// "use client";

// import { useEffect, useState } from "react";

// const FourOrbitingImages = () => {
// 	const [mounted, setMounted] = useState(false);
// 	useEffect(() => setMounted(true), []);
// 	if (!mounted) return null;

// 	const orbitRadius = 200;
// 	const orbitCount = 3;
// 	const imageSize = 120;
// 	const speed = 40;
// 	const angleStep = 360 / orbitCount;

// 	return (
// 		<div>
// 			<div className="relative w-[500px] h-[600px] flex items-center justify-center">
// 				{/* Center Image */}
// 				<div className="absolute w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl z-30 bg-yellow-300">
// 					<img src="/img/gril.jpg" alt="Center" className="w-full h-full object-cover" />
// 				</div>

// 				{/* Orbit container (rotates the whole orbit) */}
// 				<div
// 					className="absolute top-1/2 left-1/2"
// 					style={{
// 						width: `${orbitRadius * 2}px`,
// 						height: `${orbitRadius * 2}px`,
// 						marginLeft: `-${orbitRadius}px`,
// 						marginTop: `-${orbitRadius}px`,
// 						animation: `rotateOrbit ${speed}s linear infinite`,
// 						transformOrigin: "center center",
// 					}}
// 				>
// 					{/* Dashed Orbit Circle */}
// 					<div
// 						className="absolute rounded-full border-4 border-blue-500 border-dashed opacity-60"
// 						style={{
// 							width: `${orbitRadius * 2}px`,
// 							height: `${orbitRadius * 2}px`,
// 							top: 0,
// 							left: 0,
// 						}}
// 					></div>

// 					{/* Orbiting images (stay upright) */}
// 					{Array.from({ length: orbitCount }).map((_, i) => {
// 						const angle = i * angleStep;
// 						const rad = (angle * Math.PI) / 180;
// 						const x = Math.cos(rad) * orbitRadius;
// 						const y = Math.sin(rad) * orbitRadius;

// 						return (
// 							<div
// 								key={i}
// 								className="absolute"
// 								style={{
// 									top: `calc(50% + ${y - imageSize / 2}px)`,
// 									left: `calc(50% + ${x - imageSize / 2}px)`,
// 								}}
// 							>
// 								{/* Counter-rotate to keep image upright */}
// 								<div
// 									className="rounded-full overflow-hidden border-4 border-white shadow-xl bg-white"
// 									style={{
// 										width: `${imageSize}px`,
// 										height: `${imageSize}px`,
// 										animation: `counterRotate ${speed}s linear infinite`,
// 									}}
// 								>
// 									<img src="/img/bello.png" alt={`Orbit ${i + 1}`} className="w-full h-full object-cover" />
// 								</div>
// 							</div>
// 						);
// 					})}
// 				</div>
// 			</div>

// 			{/* Animation */}
// 			<style jsx global>{`
// 				@keyframes rotateOrbit {
// 					from {
// 						transform: rotate(0deg);
// 					}
// 					to {
// 						transform: rotate(360deg);
// 					}
// 				}

// 				@keyframes counterRotate {
// 					from {
// 						transform: rotate(0deg);
// 					}
// 					to {
// 						transform: rotate(-360deg);
// 					}
// 				}
// 			`}</style>
// 		</div>
// 	);
// };

// export default FourOrbitingImages;
