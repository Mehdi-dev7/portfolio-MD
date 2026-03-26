import { Brain, Code2, Lightbulb, Rocket, Users } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

/** État avant animation (aligné sur @keyframes fade-in dans index.css) */
const hiddenReveal =
	"opacity-0 translate-y-5 blur-[10px] [animation:none] will-change-[opacity,transform,filter]";

function revealOnScroll(isVisible, delayClass = "") {
	if (!isVisible) return hiddenReveal;
	return `animate-fade-in ${delayClass}`.trim();
}

/** Aligné sur Hero : positions stables pour les points (pas de Math.random au rendu). */
function dotVariation(index, salt) {
	const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
	return x - Math.floor(x);
}

const highlights = [
	{
		icon: Code2,
		title: "Code propre",
		description:
			"Concevoir du code clair, maintenable et prêt à grandir avec le produit. ",
	},
	{
		icon: Rocket,
		title: "Performance",
		description:
			"Optimiser les performances et offrir des expériences utilisateur ultra-rapides.",
	},
	{
		icon: Users,
		title: "Collaboration",
		description:
			"Collaborer étroitement avec les équipes pour transformer les idées en réalité.",
	},
	{
		icon: Brain,
		title: "IA & automatisation",
		description:
			"Intégrer l'IA et l'automatisation pour augmenter la productivité et la qualité.",
	},
	{
		icon: Lightbulb,
		title: "Innovation",
		description:
			"Rester en avance grâce aux technologies les plus récentes et aux meilleures pratiques.",
	},
];

/** Cartes : après le bloc texte (dernier élément delay-500 + fade ~0,8s), puis cascade. */
const CARD_ANIM_BASE_MS = 1050;
const CARD_STAGGER_MS = 120;

export default function About() {
	const sectionRef = useRef(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const el = sectionRef.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<section
			ref={sectionRef}
			id="about"
			className="relative scroll-mt-24 overflow-hidden py-32 md:scroll-mt-28"
		>
			{/* Fond : dégradé léger + points (même principe que le Hero, plus discret) */}
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
								backgroundColor: "#20B2A6",
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
				<div className="grid items-center gap-16 lg:grid-cols-2">
					{/* Left Column */}
					<div className="space-y-8">
						<div className={revealOnScroll(isVisible)}>
							<span className="text-xs font-medium uppercase tracking-[0.2em] text-secondary-foreground">
								À propos de moi
							</span>
						</div>
						<h2
							className={`text-4xl leading-tight font-bold text-secondary-foreground md:text-5xl ${revealOnScroll(isVisible, "animation-delay-100")}`}
						>
							Construire le futur,
							<span className="font-serif font-normal text-white italic">
								{" "}
								composant par composant.
							</span>
						</h2>
						<div className="space-y-4 leading-relaxed text-muted-foreground">
							<p className={revealOnScroll(isVisible, "animation-delay-200")}>
								Je suis{" "}
								<strong className="font-semibold text-foreground/90">
									Wilfrid
								</strong>
								, développeur full-stack et ingénieur orienté IA. Issu d’une{" "}
								<strong className="font-medium text-foreground/85">
									reconversion professionnelle
								</strong>
								, j’ai choisi de faire de cette passion — le web et la création
								d’applications utiles — mon métier. Après un premier parcours
								dans un autre secteur, j’ai investi ces dernières années dans
								une{" "}
								<strong className="font-medium text-foreground/85">
									formation solide
								</strong>{" "}
								et des projets concrets. Je continue d’approfondir les stacks
								modernes : du front soigné aux APIs et aux bases de données
								structurées.
							</p>
							<p className={revealOnScroll(isVisible, "animation-delay-300")}>
								Je travaille surtout avec{" "}
								<strong className="font-medium text-foreground/85">
									React
								</strong>
								,{" "}
								<strong className="font-medium text-foreground/85">
									Next.js
								</strong>{" "}
								et{" "}
								<strong className="font-medium text-foreground/85">
									TypeScript
								</strong>
								, des landing pages aux applications métier plus exigeantes.
								J’associe rigueur technique, intégration de l’
								<strong className="font-medium text-primary/95">IA</strong> et
								de l’
								<strong className="font-medium text-primary/95">
									automatisation
								</strong>{" "}
								là où elles font gagner du temps, et souci du détail côté
								interface et expérience utilisateur.
							</p>
							<p className={revealOnScroll(isVisible, "animation-delay-400")}>
								En dehors du code, je continue à explorer les outils et
								pratiques qui évoluent vite, à contribuer ponctuellement à
								l’open source et à échanger avec la communauté des développeurs
								— pour rester pertinent et continuer à apprendre chaque jour.
							</p>
							<div
								className={`glass glow-border rounded-2xl p-6 transition-shadow duration-500 hover:shadow-lg hover:shadow-primary/10 ${revealOnScroll(isVisible, "animation-delay-500")}`}
							>
								<p className="text-lg font-medium text-foreground italic">
									<span className="font-semibold not-italic text-foreground">
										Ma mission.
									</span>{" "}
									Concevoir des expériences numériques qui ne se contentent pas
									d’être fonctionnelles, mais vraiment agréables — des produits
									que les utilisateurs aiment utiliser et que les développeurs
									aiment maintenir.
								</p>
							</div>
						</div>
					</div>
					{/* Right column */}
					<ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
						{highlights.map(({ icon, title, description }, index) => {
							const Icon = icon;
							return (
								<li
									key={title}
									className={`group glass rounded-2xl border border-border/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 ${revealOnScroll(isVisible)}`}
									style={
										isVisible
											? {
													animationDelay: `${CARD_ANIM_BASE_MS + index * CARD_STAGGER_MS}ms`,
												}
											: undefined
									}
								>
									<div className="mb-3 flex items-center gap-3">
										<span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
											<Icon size={20} aria-hidden />
										</span>
										<h3 className="font-semibold text-foreground">{title}</h3>
									</div>
									<p className="text-sm leading-relaxed text-muted-foreground">
										{description}
									</p>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</section>
	);
}
