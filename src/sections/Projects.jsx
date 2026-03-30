import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import ProjectCard from '@/components/ProjectCard'
import imgFacturnow from '@/images/projets/Projet-Facturnow.png'
import imgLadyHaya from '@/images/projets/Projet-Lady-Haya.png'
import imgSetup from '@/images/projets/Projet-Setup.png'
import imgSelmalya from '@/images/projets/Projet-Selmalya.png'

/** Aligné sur About : positions stables pour les points. */
function dotVariation(index, salt) {
	const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
	return x - Math.floor(x);
}

const projects = [
	{
		title: 'Facturnow',
		description: 'Facturnow est une application de facturation en ligne qui permet de gérer facilement vos factures et vos clients.',
		image: imgFacturnow,
		tags: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Supabase', 'N8N'],
		link: 'https://facturnow.fr',
		github: 'https://github.com/facturnow',
	},
	{
		title: 'Lady-Haya',
		description: 'Lady-Haya est une application de e-commerce pour la vente de vêtements pour femmes.',
		image: imgLadyHaya,
		tags: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Supabase', 'Sanity'],
		link: 'https://lady-haya-wear-beta.vercel.app/',
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
];

export default function Projects() {
	return (
		<section
			id="projets"
			className="relative scroll-mt-24 overflow-hidden py-16 md:scroll-mt-28"
			aria-label="Projets"
		>
			{/* Fond : dégradé + points (même principe que About) */}
			<div
				className="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-primary/6 via-transparent to-transparent"
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
				<div className='text-center mx-auto max-w-3xl mb-16'>
					<span className='text-secondary-foreground text-sm font-medium uppercase tracking-wider animate-fade-in'>Featured Work</span>
					<h2 className='text-4xl md:text-5xl font-bold mt-4 mb-6 text-secondary-foreground animate-fade-in animation-delay-100'>Projects that
					<span className='font-serif italic font-normal text-white'> {" "} make a impact.</span>
					</h2>
					<p className='text-muted-foreground animate-fade-in animation-delay-200'>A selection of my recent work, from complex web applications to innovative tools that automate tasks and improve workflows.</p>
				</div>
				{/* Projects Grid */}
				<div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8'>
					{projects.map((project, index) => (
						<div key={project.title} className="group flex flex-col gap-4 bg-card">
							<ProjectCard project={project} index={index} />
							<div className="space-y-4 p-6">
								<div className="flex items-start justify-between">
									<h3 className="text-xl font-semibold transition-colors group-hover:text-primary">
										{project.title}
									</h3>
									<ArrowUpRight
										className="size-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-primary"
										aria-hidden
									/>
								</div>
								<p className="text-sm text-muted-foreground">{project.description}</p>
								<div className="flex flex-wrap gap-2">
									{project.tags.map((tag) => (
										<span
											key={tag}
											className="rounded-full border border-border/50 bg-surface px-4 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
