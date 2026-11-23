import React, { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import ProjectCard from '@/components/ProjectCard'
import imgFacturnow from '@/images/projets/Projet-Facturnow.png'
import imgLadyHaya from '@/images/projets/Projet-Lady-Haya.png'
import imgSetup from '@/images/projets/Projet-Setup.png'
import imgSelmalya from '@/images/projets/Projet-Selmalya.png'
import imgDashboardSaaS from '@/images/projets/Projet-dashboard.png'
import imgCloneThreads from '@/images/projets/Projet-thread-clone.png'
import imgLLDI from '@/images/projets/Projet-LLDI.png'
import AnimatedBorderButton from '@/components/AnimatedBorderButton'

/** Aligné sur About : positions stables pour les points. */
function dotVariation(index, salt) {
	const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
	return x - Math.floor(x);
}

const projects = [
	{
		title: "La langue de l'islam",
		description: "Plateforme complète d'apprentissage de la langue arabe : cours en direct, suivi pédagogique et boutique en ligne, réunis dans un seul écosystème.",
		highlights: [
			['Espace élève e-learning', 'cours, progression, ressources et planning des séances'],
			['Classes en visio Zoom', 'création et accès aux sessions en direct, directement depuis la plateforme'],
			['Dashboard admin', 'gestion des élèves, des professeurs, des cours et des inscriptions'],
			['Espace e-commerce', 'vente des manuels de cours avec paiement en ligne'],
		],
		image: imgLLDI,
		tags: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
		link: 'https://lalanguedelislam.com/',
	},
	{
		title: 'Facturnow',
		description: 'SaaS de facturation complet pour freelances, auto-entrepreneurs et PME : du devis au paiement encaissé, avec prélèvement SEPA automatique pour en finir avec les impayés.',
		highlights: [
			['Tous les documents', 'devis, factures, acomptes, avoirs, proformas, bons de commande et de livraison, export PDF'],
			['Paiement en ligne', 'carte (Stripe), PayPal et prélèvement SEPA (GoCardless) directement depuis la facture'],
			['Automatisation', 'factures récurrentes et relances automatiques sur 3 niveaux'],
			['Facture électronique', 'émission et réception via plateforme agréée (réforme 2026)'],
			['Pilotage', 'statistiques, export comptable FEC / CSV, API & webhooks'],
		],
		image: imgFacturnow,
		tags: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Supabase', 'Stripe'],
		link: 'https://facturnow.fr',
	},
	{
		title: 'Lady-Haya',
		description: "Boutique e-commerce de prêt-à-porter féminin : catalogue géré via Sanity CMS, panier et parcours d'achat complet. Le développement est suspendu à la demande de la cliente.",
		status: 'Projet en pause',
		image: imgLadyHaya,
		tags: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Supabase', 'Sanity'],
		link: 'https://lady-haya-wear-git-main-lady-hayas-projects.vercel.app',
		github: 'https://github.com/Mehdi-dev7/lady-haya-wear',
	},
	{
		title: 'Setup-Teletravail',
		description: 'Setup-Teletravail est une application de comparateur de prix pour matériel informatique dédié au teletravail.',
		image: imgSetup,
		tags: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'N8N'],
		link: 'https://setup-teletravail.fr',
		github: 'https://github.com/Mehdi-dev7/setup-teletravail-beta',
	},
	{
		title: 'Selmalya',
		description: 'Selmalya est site vitrine pour une entreprise de gestion de Tiers-Payant pour les pharmacies.',
		image: imgSelmalya,
		tags: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
		link: 'https://www.selmalya-tiers-payant.fr/',
		github: 'https://github.com/Mehdi-dev7/Selmalya',
	},
	{
		title: 'Dashboard SaaS',
		description: 'Dashboard SaaS est un dashboard Admin pour une application SaaS.',
		image: imgDashboardSaaS,
		tags: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
		link: 'https://dashboard-saas-mehdi.netlify.app/',
		github: 'https://github.com/Mehdi-dev7/dashboard-saas',
	},
	{
		title: 'Clone Threads',
		description: 'Clone Threads est un clone de la plateforme Threads.',
		image: imgCloneThreads,
		tags: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
		link: 'https://clone-threads.netlify.app/login',
		github: 'https://github.com/Mehdi-dev7/clone-threads',
	},
	
];

const INITIAL_VISIBLE = 4;
const LOAD_MORE_STEP = 2;

export default function Projects() {
	const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
	const visibleProjects = projects.slice(0, visibleCount);
	const canLoadMore = visibleCount < projects.length;

	return (
		<section
			id="projets"
			className="relative scroll-mt-24 overflow-hidden py-16 md:scroll-mt-28"
			aria-label="Projets"
		>
			{/* Fond : dégradé + points (même principe que About) */}
			<div
				className="pointer-events-none absolute inset-0 z-0"
				aria-hidden
			/>
			<div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
				{[...Array(36)].map((_, index) => {
					const left = dotVariation(index, 1) * 100;
					const top = dotVariation(index, 2) * 100;
					const duration = 18 + dotVariation(index, 3) * 22;
					const delay = dotVariation(index, 4) * 6;
					return (
						<div
							key={index}
							className="absolute h-1 w-1 rounded-full opacity-25 sm:h-1.5 sm:w-1.5 sm:opacity-30"
							style={{
								backgroundColor: '#20B2A6',
								left: `${left}%`,
								top: `${top}%`,
								animation: `slow-drift ${duration}s ease-in-out infinite`,
								animationDelay: `${delay}s`,
							}}
						/>
					);
				})}
			</div>
			<div className="relative z-10 container mx-auto px-6">
				{/* Section Header */}
				<div className="mx-auto mb-16 max-w-3xl text-center">
					<span className="animate-fade-in text-sm font-medium tracking-wider text-secondary-foreground uppercase">
						Projets phares
					</span>
					<h2 className="animation-delay-100 mt-4 mb-6 animate-fade-in text-4xl font-bold text-secondary-foreground md:text-5xl">
						Des projets qui{" "}
						<span className="font-serif font-normal text-white italic">font la différence.</span>
					</h2>
					<p className="animation-delay-200 animate-fade-in text-muted-foreground">
						Une sélection de réalisations récentes : applications web exigeantes, outils innovants,
						automatisation et workflows plus fluides.
					</p>
				</div>
				{/* Projects Grid */}
				<div className='grid grid-cols-1 lg:grid-cols-2  gap-8'>
					{visibleProjects.map((project, index) => (
						<div
							key={project.title}
							className="group flex flex-col gap-0 overflow-hidden rounded-xl glass"
						>
							<ProjectCard project={project} index={index} />
							<div className="space-y-4 p-6">
								<a
									href={project.link}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-start justify-between"
								>
									<h3
										className="notranslate text-xl font-semibold transition-colors group-hover:text-primary"
										translate="no"
									>
										{project.title}
									</h3>
									<ArrowUpRight
										className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary"
										aria-hidden
									/>
								</a>
								{/* Badge de statut optionnel (ex. projet en pause) */}
								{project.status && (
									<span className="inline-flex items-center gap-2 rounded-full border border-highlight/40 bg-highlight/10 px-3 py-1 text-xs font-medium text-highlight">
										<span className="size-1.5 rounded-full bg-highlight" aria-hidden />
										{project.status}
									</span>
								)}
								<p className="text-sm text-muted-foreground">{project.description}</p>
								{/* Points clés optionnels : [titre, détail] */}
								{project.highlights && (
									<ul className="space-y-2">
										{project.highlights.map(([title, detail]) => (
											<li key={title} className="flex gap-2.5 text-sm text-muted-foreground">
												<span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
												<span>
													<strong className="font-medium text-foreground">{title}</strong> : {detail}
												</span>
											</li>
										))}
									</ul>
								)}
								<div className="flex flex-wrap gap-2">
									{project.tags.map((tag) => (
										<span
											key={tag}
											className="notranslate rounded-full border border-border/50 bg-surface px-4 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
											translate="no"
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
				{canLoadMore && (
					<div className="mt-14 flex justify-center">
						<AnimatedBorderButton
							icon={ArrowUpRight}
							className="w-full sm:w-auto"
							onClick={() =>
								setVisibleCount((n) => Math.min(n + LOAD_MORE_STEP, projects.length))
							}
						>
							Voir plus de projets
						</AnimatedBorderButton>
					</div>
				)}
			</div>
		</section>
	);
}
