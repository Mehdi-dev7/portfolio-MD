import React from "react";
import Herobg from "../assets/Hero-bg/bg-hero-1.jpg"

export default function Hero() {
	return (
		<section className="relative min-h-screen flex items-center overflow-hidden">
			{/* BG */}
			<div className="absolute inset-0">
				<img
					src={Herobg}
					alt="heor-bg"
					className="w-full h-full object-cover opacity-20"
				/>
        <div className="absolute inset-0 bg-linear-to-b from-black/80 to-transparent"></div>
			</div>

			{/* Geen Dots */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{[...Array(50)].map((_, index) => (
					<div
						key={index}
						className="absolute w-1.5 h-1.5 rounded-full opacity-60"
						style={{
							backgroundColor: "#20B2A6",
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animation: `slow-drift ${15 + Math.random() * 20}s ease-in-out infinite`,
							animationDelay: `${Math.random() * 5}s`,
						}}
					></div>
				))}
			</div>

			{/* Content */}
			<div>
				<div>
					{/* Left Column - Text Content */}
					{/* Right Column - Profile Image */}
				</div>
			</div>
      
		</section>
	);
}
