import { Briefcase, Code2, Component, Layers, Sparkles } from "lucide-react";
import React from "react";

/** Aligné sur Projects / About : positions stables pour les points. */
// function dotVariation(index, salt) {
// 	const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
// 	return x - Math.floor(x);
// }

const STAGGER_DELAY = [
	"",
	"animation-delay-100",
	"animation-delay-200",
	"animation-delay-300",
	"animation-delay-400",
];

const formations = [
	{
		icon: Briefcase,
		isCurrent: true,
		period: "Janvier 2026 — Actuellement",
		institution: "Freelance & projets personnels",
		format: "En cours",
		title: "Missions réelles & portfolio",
		description:
		"Accompagnement de missions en freelance : cadrage, développement, itérations et mise en ligne. Projets personnels pour expérimenter les stacks, renforcer le portfolio et tenir une veille continue sur les bonnes pratiques produit et technique.",
		tags: ["Freelance", "Livraison", "Mise en production", "Veille"],
	},
	{
		icon: Sparkles,
		period: "Septembre 2025 — Décembre 2025",
		institution: "Veille technique & pratique intensive",
		format: "IA générative & automatisation",
		title: "Outils d’IA et workflows automatisés",
		description:
		"Montée en compétence sur les assistants de code (Claude), intégration au flux de travail avec Claude Code et Cursor, et conception de chaînes d’automatisation avec n8n (connecteurs, scénarios, intégrations) pour gagner en productivité et en fiabilité sur les livrables.",
		tags: ["Claude", "Cursor", "Claude Code", "n8n"],
	},
	{
		icon: Layers,
		period: "Janvier 2025 — Juillet 2025",
		institution: "École du Web & Believemy",
		format: "Formation en ligne",
		title: "Next.js & TypeScript",
		description:
		"Développement d’applications web full-stack avec Next.js (App Router), typage strict avec TypeScript, rendu serveur et client, routes API et bonnes pratiques pour des projets structurés, scalables et prêts à être déployés.",
		tags: ["Next.js", "TypeScript", "App Router", "API", "supabase"],
	},
	{
		icon: Component,
		period: "Septembre 2024 — Décembre 2024",
		institution: "École du Web & Believemy",
		format: "Formation en ligne",
		title: "React & écosystème front moderne",
		description:
		"Conception d’interfaces par composants, hooks React (état, effets, contexte), organisation du code et routage (React Router). Approche progressive vers une architecture maintenable et des patterns courants en production.",
		tags: ["React", "Hooks", "SPA", "React Router"],
	},
	{
		icon: Code2,
		period: "Janvier 2024 — Juin 2024",
		institution: "Believemy",
		format: "Formation en ligne",
		title: "Fondations du développement web",
		description:
			"Acquisition des bases du front-end : HTML5 sémantique, CSS3 (mise en page, Flexbox, responsive), JavaScript ES6+ et premières logiques d’algorithmique. Manipulation du DOM, intégration de maquettes et mise en œuvre sur des exercices et projets guidés pour solidifier les fondamentaux.",
		tags: ["HTML5", "CSS3", "JavaScript", "Responsive"],
	},
];

export default function Experience() {
	return (
		<section
			id="experience"
			className="relative scroll-mt-24 overflow-hidden py-16 md:scroll-mt-28 md:py-24"
			aria-label="Parcours formation développement"
		>
			<div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"></div>
			<div className="container mx-auto px-6 relative z-10">
				{/* Section Header */}
				<div className="max-w-3xl mb-16">
					<span className="text-sm font-medium uppercase tracking-wider text-secondary-foreground animate-fade-in">
						Parcours professionnel
					</span>
					<h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-secondary-foreground animate-fade-in animation-delay-100">
						Un parcours qui{" "}
						<span className="font-serif italic font-normal text-white">parle de lui-même.</span>
					</h2>
					<p className="text-muted-foreground animate-fade-in animation-delay-200">
						Mon parcours dans le développement web, des premiers pas à aujourd’hui.
					</p>
				</div>
				{/* Timeline */}
				<div className="relative">
				<div className="timeline-glow absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-linear-to-b from-primary/70 via-primary/30 to-transparent md:-translate-x-1/2 shadow-[0_0_25px_rgba(32,178,166,0.8)]"></div>
           {/* experience items */}
					 <div className="space-y-12">
             {formations.map((formation, index) => (
							 <div key={index} className="relative grid md:grid-cols-2 gap-8 animate-fade-in" style={{ animationDelay: `${(index + 1) * 150}ms` }}>

							 {/* dot */}
								<div className="absolute left-0 md:left-1/2 top-0 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-primary ring-4 ring-background">
									{formation.isCurrent && (
										<span
											className="absolute inset-0 rounded-full bg-primary opacity-75 animate-ping"
											aria-hidden
										/>
									)}
								</div>
								{/* content */}
								<div className={`pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"}`}>
									<div className={`glass p-6 rounded-2xl border border-primary/30 hover:border-primary/50 transition-all duration-500`}>
										<span className="text-sm text-primary font-medium">{formation.period}</span>
										<h3 className="text-xl font-semibold mt-2">{formation.title}</h3>
										<p className="text-muted-foreground">{formation.institution}</p>
										<p className="text-muted-foreground text-sm mt-4">{formation.description}</p>
										<div className={`flex flex-wrap gap-2 mt-4 ${index % 2 === 0 ? "justify-end" : ""}`}>
											{formation.tags.map((tag, index) => (
												<span key={index} className="px-3 py-1 bg-surface text-xs rounded-full" >{tag}</span>
											))}
										</div>
									</div>
								</div>
							 </div>
						 ))}
					 </div>
				</div>
			</div>
		</section>
	);
}
