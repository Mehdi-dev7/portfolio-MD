import { scrollToHash } from "@/utils/scrollToHash";
import { ArrowUp, Github, Instagram, Linkedin } from "lucide-react";
import { createElement } from "react";

const footerLinks = [
	{ href: "#about", label: "À propos" },
	{ href: "#projets", label: "Projets" },
	{ href: "#experience", label: "Expérience" },
	{ href: "#testimonials", label: "Témoignages" },
	{ href: "#contact", label: "Contact" },
];

const socials = [
	{ icon: Github, href: "https://github.com/Mehdi-dev7", label: "GitHub" },
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
];

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer
			className="relative border-t border-border/50 bg-linear-to-b from-surface/40 to-background"
			aria-label="Pied de page"
		>
			<div
				className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/35 to-transparent"
				aria-hidden
			/>
			<div className="container mx-auto px-6 py-12 md:py-14">
				<div className="grid gap-10 md:grid-cols-[1.1fr_1fr_auto] md:items-start md:gap-12">
					<div className="space-y-3">
						<a
							href="#"
							className="inline-block text-xl font-bold tracking-tight text-foreground transition-colors hover:text-primary"
							onClick={(e) => {
								e.preventDefault();
								window.scrollTo({ top: 0, behavior: "smooth" });
								window.history.replaceState(null, "", window.location.pathname);
							}}
						>
							WD<span className="text-primary">.</span>
						</a>
						<p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
							Portfolio vitrine — développement web et projets perso. Pas de cookies
							commerciaux ici, juste du code et des idées.
						</p>
					</div>

					<div>
						<p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
							Navigation
						</p>
						<ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
							{footerLinks.map((link) => (
								<li key={link.href}>
									<a
										href={link.href}
										className="text-sm text-foreground/80 transition-colors hover:text-primary"
										onClick={(e) => {
											e.preventDefault();
											scrollToHash(link.href);
										}}
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div className="md:text-right">
						<p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
							Réseaux
						</p>
						<div className="flex flex-wrap gap-2 md:justify-end">
							{socials.map(({ icon, href, label }) => (
								<a
									key={label}
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={label}
									className="rounded-full border border-border/60 bg-surface/50 p-2.5 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
								>
									{createElement(icon, { size: 20, "aria-hidden": true })}
								</a>
							))}
						</div>
					</div>
				</div>

				<div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 sm:flex-row">
					<p className="text-center text-xs text-muted-foreground sm:text-left">
						© {year} Wilfrid · fait avec{" "}
						<span className="text-primary/90">React</span> et{" "}
						<span className="text-primary/90">Vite</span>
					</p>
					<button
						type="button"
						className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/40 px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/35 hover:text-primary"
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					>
						Haut de page
						<ArrowUp className="size-3.5" aria-hidden />
					</button>
				</div>
			</div>
		</footer>
	);
}
