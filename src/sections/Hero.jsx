import AnimatedBorderButton from "@/components/AnimatedBorderButton";
import Button from "@/components/Button";
import { scrollToHash } from "@/utils/scrollToHash";
import {
	ArrowRight,
	ChevronDown,
	ExternalLink,
	Github,
	Instagram,
	Linkedin,
} from "lucide-react";

const CV_VIRTUAL_URL = "https://cv-didou.netlify.app/";
import React, { useCallback, useEffect, useRef, useState } from "react";
import openaiLogo from "@/assets/icons/openai.svg";
import reactNativeLogo from "@/assets/icons/react-native.svg";
import Herobg from "../assets/Hero-bg/bg-hero-1.jpg";
import profilePhoto from "../images/IMG-moi.jpg";

/** Valeur stable dans [0, 1) à partir de l’index (évite Math.random au rendu). */
function dotVariation(index, salt) {
	const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
	return x - Math.floor(x);
}

const skills = [
	"React",
	"Next.js",
	"React Native",
	"TypeScript",
	"Tailwind CSS",
	"Node.js",
	"Prisma",
	"Supabase",
	"Git",
	"GitHub",
	"PostgreSQL",
	"MySQL",
	"MongoDB",
	"N8N",
	"OpenAI",
	"Claude",
];

/** Slugs [Simple Icons](https://simpleicons.org) — teinte proche du primary du thème */
const SKILL_ICON_SLUG = {
	React: "react",
	"Next.js": "nextdotjs",
	TypeScript: "typescript",
	"Tailwind CSS": "tailwindcss",
	"Node.js": "nodedotjs",
	Prisma: "prisma",
	Supabase: "supabase",
	Git: "git",
	GitHub: "github",
	PostgreSQL: "postgresql",
	MySQL: "mysql",
	MongoDB: "mongodb",
	N8N: "n8n",
	Claude: "claude",
};

const SKILL_ICON_TINT = "20b2a6";

function SkillChip({ skill }) {
	const slug = SKILL_ICON_SLUG[skill];
	const iconSrc =
		skill === "React Native"
			? reactNativeLogo
			: skill === "OpenAI"
				? openaiLogo
				: slug
					? `https://cdn.simpleicons.org/${slug}/${SKILL_ICON_TINT}`
					: null;
	return (
		<div
			className="notranslate flex shrink-0 items-center gap-2.5 px-5 py-3 sm:gap-3 sm:px-8 sm:py-4"
			translate="no"
		>
			{iconSrc ? (
				<img
					src={iconSrc}
					alt=""
					width={24}
					height={24}
					className={`shrink-0 object-contain object-left sm:h-6 sm:w-6 ${skill === "OpenAI" ? "h-5 w-[1.35rem] sm:h-6 sm:w-7" : "h-5 w-5"} ${skill === "React Native" || skill === "OpenAI" ? "opacity-100" : "opacity-90"}`}
					loading="lazy"
					decoding="async"
				/>
			) : null}
			<span className="text-lg font-semibold text-muted-foreground/50 transition-colors duration-300 hover:text-muted-foreground sm:text-xl">
				{skill}
			</span>
		</div>
	);
}

/** Mobile : défilement auto + possibilité de glisser pour aller plus vite (pause le temps du geste). */
function MobileSkillsScroller({ skillList }) {
	const ref = useRef(null);
	const [paused, setPaused] = useState(false);
	const resumeTimerRef = useRef(null);

	const onUserStart = useCallback(() => {
		setPaused(true);
		if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
	}, []);

	const onUserEnd = useCallback(() => {
		if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
		resumeTimerRef.current = setTimeout(() => setPaused(false), 3800);
	}, []);

	useEffect(
		() => () => {
			if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
		},
		[],
	);

	useEffect(() => {
		let raf = 0;
		const step = () => {
			const node = ref.current;
			if (
				node &&
				!window.matchMedia("(min-width: 640px)").matches &&
				!window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
				!paused
			) {
				node.scrollLeft += 0.42;
				const half = node.scrollWidth / 2;
				if (half > 20 && node.scrollLeft >= half - 0.5) {
					node.scrollLeft -= half;
				}
			}
			raf = requestAnimationFrame(step);
		};
		raf = requestAnimationFrame(step);
		return () => cancelAnimationFrame(raf);
	}, [paused]);

	return (
		<>
			<div
				ref={ref}
				className="-mx-2 flex gap-0 overflow-x-auto overflow-y-visible overscroll-x-contain px-2 pb-1 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-x"
				role="region"
				aria-label="Technologies — défilement automatique ; glissez pour parcourir plus vite"
				onTouchStart={onUserStart}
				onTouchEnd={onUserEnd}
				onPointerDown={onUserStart}
				onPointerUp={onUserEnd}
				onPointerLeave={onUserEnd}
			>
				{[...skillList, ...skillList].map((skill, idx) => (
					<SkillChip key={idx} skill={skill} />
				))}
			</div>
			
		</>
	);
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
						<div className="animate-fade-in flex justify-center lg:justify-start">
							<span className="glass text-primary inline-flex max-w-full flex-col items-center gap-2 rounded-full px-4 py-2 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-2 sm:gap-y-1">
								<span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
									<span
										className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-primary"
										aria-hidden
									/>
									<span className="text-foreground/90">Développeur full-stack</span>
									<span className="text-muted-foreground hidden sm:inline" aria-hidden>
										·
									</span>
									<span className="text-foreground/90 text-xs sm:text-sm">
										Ingénieur IA & automatisation
									</span>
								</span>
								<span
									className="text-muted-foreground hidden sm:inline"
									aria-hidden
								>
									·
								</span>
								<span
									className="notranslate text-center text-foreground/90 text-xs sm:text-sm"
									translate="no"
								>
									React / Next.js
								</span>
							</span>
						</div>
						{/* Headline */}
						<div className="space-y-5">
							<p className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-foreground/90 animate-fade-in animation-delay-100">
								Produits web & workflows intelligents
							</p>
							<h1
								className="notranslate text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight animate-fade-in animation-delay-200"
								translate="no"
							>
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
								Salut, je suis{" "}
								<strong className="font-semibold text-foreground/90">
									Wilfrid
								</strong>{" "}
								— je crée des applications web{" "}
								<span className="notranslate" translate="no">
									(React, Next.js, TypeScript)
								</span>{" "}
								et j’intègre{" "}
								<strong className="font-semibold text-primary/95">
									l’IA et l’automatisation
								</strong>{" "}
								là où elles font gagner du temps : moins de tâches répétitives,
								plus de valeur produit.
							</p>
						</div>

						{/* CTAs — colonne sur mobile, ligne à partir de sm */}
						<div className="flex w-full flex-col gap-4 animate-fade-in animation-delay-300 sm:flex-row sm:flex-wrap sm:items-center">
							<Button
								type="button"
								size="lg"
								className="w-full justify-center sm:w-auto"
								onClick={() => scrollToHash("#contact")}
							>
								Contactez-Moi <ArrowRight size={20} />
							</Button>
							<AnimatedBorderButton
								className="w-full sm:w-auto"
								href={CV_VIRTUAL_URL}
								icon={ExternalLink}
							>
								Voir mon CV virtuel
							</AnimatedBorderButton>
						</div>
						{/* Social Links — icônes Lucide : Github, Linkedin, Instagram */}
						<div className="flex flex-wrap items-center gap-3 sm:gap-4 animate-fade-in animation-delay-400">
							<span className="shrink-0 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground/90">
								Suivez-moi sur :
							</span>
							{[
								{
									icon: Github,
									href: "https://github.com/Mehdi-dev7",
									label: "GitHub",
								},
								{
									icon: Linkedin,
									href: "https://www.linkedin.com/feed/",
									label: "LinkedIn",
								},
								{
									icon: Instagram,
									href: "https://www.instagram.com/mehdi.dev7",
									label: "Instagram",
								},
							].map((social) => {
								const Icon = social.icon;
								return (
									<a
										key={social.label}
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={social.label}
										className="p-2 rounded-full glass transition-all duration-300 hover:bg-primary/10 hover:text-primary"
									>
										<Icon size={20} aria-hidden />
									</a>
								);
							})}
						</div>
					</div>
					{/* Right Column - Profile Image */}
					<div className="relative animate-fade-in animation-delay-300">
						<div className="relative max-w-md mx-auto">
							<div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/30 via-transparent to-primary/10 blur-2xl animate-pulse"></div>
							<div className="relative glass rounded-3xl p-2 glow-border">
								<img
									src={profilePhoto}
									alt="Portrait de Wilfrid"
									className="w-full aspect-4/5 object-cover object-top rounded-2xl border border-border/60 shadow-lg"
								/>
								{/* Floating Badge */}
								<div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-3 animate-float">
									<div className="flex items-center gap-3">
										<div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
										<span className="text-sm font-medium">
											Disponible immédiatement
										</span>
									</div>
								</div>
								{/* Stats Badge */}
								<div className="absolute -top-4 -left-4 glass rounded-xl px-4 py-3 animate-float animation-delay-500">
									<div className="text-2xl font-bold text-primary">2+</div>
									<div className="text-xs text-muted-foreground">
										Années d’expérience
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Skills */}
				<div className="mt-20 animate-fade-in animation-delay-600">
					<p className="mb-8 text-center text-xs sm:text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground/90">
						Technologies que j'utilise :
					</p>
					<div className="sm:hidden">
						<MobileSkillsScroller skillList={skills} />
					</div>
					{/*
					  sm+ : marquee infini — w-max pour que -50% = une série (boucle sans saut).
					*/}
					<div className="relative hidden overflow-hidden sm:block">
						<div className="flex w-max animate-marquee">
							{[...skills, ...skills].map((skill, idx) => (
								<SkillChip key={idx} skill={skill} />
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in animation-delay-800">
				<a
					href="#about"
					className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary"
				>
					<span className="text-xs uppercase tracking-wider">Scroll down</span>
					<ChevronDown size={20} className="animate-bounce" />
				</a>
			</div>
		</section>
	);
}
