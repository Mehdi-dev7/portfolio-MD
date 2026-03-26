import React from "react";
import Herobg from "../assets/Hero-bg/bg-hero-1.jpg";
import Button from "@/components/Button";
import { ArrowRight } from "lucide-react";
import AnimatedBorderButton from "@/components/AnimatedBorderButton";

/** Valeur stable dans [0, 1) à partir de l’index (évite Math.random au rendu). */
function dotVariation(index, salt) {
	const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
	return x - Math.floor(x);
}

export default function Hero() {
	return (
		<section className="relative min-h-screen flex items-center overflow-hidden">
			{/* BG */}
			<div className="absolute inset-0">
				<img
					src={Herobg}
					alt=""
					className="w-full h-full object-cover opacity-15"
					aria-hidden
				/>
				<div className="absolute inset-0 bg-linear-to-b from-black/80 to-transparent"></div>
			</div>

			{/* Geen Dots */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{[...Array(50)].map((_, index) => {
					const left = dotVariation(index, 1) * 100;
					const top = dotVariation(index, 2) * 100;
					const duration = 15 + dotVariation(index, 3) * 20;
					const delay = dotVariation(index, 4) * 5;
					return (
						<div
							key={index}
							className="absolute w-1.5 h-1.5 rounded-full opacity-60"
							style={{
								backgroundColor: "#20B2A6",
								left: `${left}%`,
								top: `${top}%`,
								animation: `slow-drift ${duration}s ease-in-out infinite`,
								animationDelay: `${delay}s`,
							}}
						></div>
					);
				})}
			</div>

			{/* Content */}
			<div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					{/* Left Column - Text Content */}
					<div className="space-y-8">
						<div className="animate-fade-in">
							<span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 px-4 py-2 rounded-full glass text-sm text-primary">
								<span className="w-2 h-2 shrink-0 bg-primary rounded-full animate-pulse" aria-hidden />
								<span className="text-foreground/90">
									Développeur  full-stack
								</span>
								<span className="text-muted-foreground hidden sm:inline" aria-hidden>
									·
								</span>
								<span className="text-foreground/90 text-xs sm:text-sm">
									Ingénieur IA & automatisation
								</span>
								<span className="text-muted-foreground hidden md:inline" aria-hidden>
									·
								</span>
								<span className="text-foreground/90 text-xs md:text-sm">
									React / Next.js
								</span>
							</span>
						</div>
						{/* Headline */}
						<div className="space-y-5">
							<p className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-foreground/90 animate-fade-in animation-delay-100">
								Produits web & workflows intelligents
							</p>
							<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight animate-fade-in animation-delay-200">
								<span className="block">
									Code <span className="text-primary glow-text">propre</span>,
								</span>
								<span className="block mt-1 md:mt-2">
									<span className="hero-gradient-word">impact</span>{" "}
									<span className="font-serif italic font-normal text-foreground/95">
										mesurable.
									</span>
								</span>
							</h1>
							<p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed animate-fade-in animation-delay-800">
								Salut, je suis <strong className="font-semibold text-foreground/90">Wilfrid</strong>
								{" "}
								— je conçois des applications web (React, Next.js, TypeScript) et j’intègre{" "}
								<strong className="font-semibold text-primary/95">l’IA et l’automatisation</strong>
								{" "}
								là où elles font gagner du temps : moins de tâches répétitives, plus de valeur produit.
							</p>
						</div>

						{/* CTAs */}
						<div>
							<Button size="lg">Contactez-Moi <ArrowRight size={20} /></Button>
							<AnimatedBorderButton />
						</div>
					</div>
					{/* Right Column - Profile Image */}
				</div>
			</div>
		</section>
	);
}
