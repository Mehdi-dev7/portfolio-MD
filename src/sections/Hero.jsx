import React from "react";
import Herobg from "../assets/Hero-bg/bg-hero-1.jpg";

export default function Hero() {
	return (
		<section className="relative min-h-screen flex items-center overflow-hidden">
			{/* BG */}
			<div className="absolute inset-0">
				<img
					src={Herobg}
					alt="heor-bg"
					className="w-full h-full object-cover opacity-15"
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
			<div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					{/* Left Column - Text Content */}
					<div className="space-y-8">
						<div className="animate-fade-in">
							<span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary">
								<span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
								Développeur Web Full-stack • Spécialiste React/Next.js
							</span>
						</div>
						{/* Headline */}
						<div className="space-y-4">
							<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in animation-delay-100">
								Code <span className="text-primary glow-text">propre</span>
								<br />
								résultats <span className="font-serif italic font-normal text-white">concrets.</span>
							</h1>
							<p className="text-lg text-muted-foreground max-w-lg animate-fade-in animation-delay-200">
								Salut, je suis Wilfrid developpeur Full-stack. Je construis des applications web modernes avec React, Next.js et TypeScript — du front soigné au back structuré.
							</p>
						</div>
					</div>
					{/* Right Column - Profile Image */}
				</div>
			</div>
		</section>
	);
}
