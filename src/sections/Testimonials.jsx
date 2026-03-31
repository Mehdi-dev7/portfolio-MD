import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import testimonials from "@/data/testimonials.json";

/** Aligné sur Projects : positions stables pour les points. */
function dotVariation(index, salt) {
	const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
	return x - Math.floor(x);
}

const ROTATION_MS = 7000;
const MAX_STARS = 5;
/** Affichage des avis : au-delà, troncature + « … » (texte complet conservé pour l’accessibilité). */
const AVIS_MAX_WORDS = 70;

function truncateWords(text, maxWords) {
	const words = String(text).trim().split(/\s+/).filter(Boolean);
	if (words.length <= maxWords) {
		return { display: String(text).trim(), truncated: false };
	}
	return {
		display: `${words.slice(0, maxWords).join(" ")}…`,
		truncated: true,
	};
}

function clampRating(n) {
	const x = Number(n);
	if (Number.isNaN(x)) return 0;
	return Math.min(MAX_STARS, Math.max(0, Math.round(x)));
}

function StarRating({ value }) {
	const v = clampRating(value);
	return (
		<div
			className="flex gap-0.5"
			role="img"
			aria-label={`${v} étoile${v > 1 ? "s" : ""} sur ${MAX_STARS}`}
		>
			{[...Array(MAX_STARS)].map((_, i) => (
				<Star
					key={i}
					className={`size-4 shrink-0 sm:size-4.5 ${
						i < v
							? "fill-highlight text-highlight"
							: "fill-none text-muted-foreground/45"
					}`}
					strokeWidth={1.35}
					aria-hidden
				/>
			))}
		</div>
	);
}

/** Desktop : pile marquée. Mobile : décalages réduits pour éviter le débordement latéral / bas. */
const STACK_DEPTH_DESKTOP = 4;
const STACK_DEPTH_MOBILE = 3;

function stackLayer(position, compact) {
	const depth = compact ? STACK_DEPTH_MOBILE : STACK_DEPTH_DESKTOP;
	const p = Math.min(position, depth - 1);

	if (compact) {
		const layers = [
			{
				z: 50,
				y: 0,
				scale: 1,
				rotate: 0,
				opacity: 1,
				shadow:
					"0 16px 32px -12px rgba(0,0,0,0.45), 0 0 0 1px color-mix(in srgb, var(--color-primary) 30%, transparent)",
				filter: "none",
				border: "color-mix(in srgb, var(--color-primary) 40%, transparent)",
			},
			{
				z: 40,
				y: 10,
				scale: 0.96,
				rotate: -1.5,
				opacity: 0.95,
				shadow: "0 10px 20px -8px rgba(0,0,0,0.35)",
				filter: "brightness(0.96)",
				border: "color-mix(in srgb, var(--color-border) 65%, transparent)",
			},
			{
				z: 30,
				y: 22,
				scale: 0.91,
				rotate: 2,
				opacity: 0.82,
				shadow: "0 6px 14px -6px rgba(0,0,0,0.3)",
				filter: "brightness(0.9)",
				border: "color-mix(in srgb, var(--color-border) 50%, transparent)",
			},
		];
		return layers[p];
	}

	const layers = [
		{
			z: 50,
			y: 0,
			scale: 1,
			rotate: 0,
			opacity: 1,
			shadow:
				"0 28px 56px -16px rgba(0,0,0,0.55), 0 0 0 1px color-mix(in srgb, var(--color-primary) 35%, transparent), 0 0 48px color-mix(in srgb, var(--color-primary) 18%, transparent)",
			filter: "none",
			border: "color-mix(in srgb, var(--color-primary) 45%, transparent)",
		},
		{
			z: 40,
			y: 36,
			scale: 0.9,
			rotate: -4,
			opacity: 0.96,
			shadow: "0 18px 36px -12px rgba(0,0,0,0.45)",
			filter: "brightness(0.94)",
			border: "color-mix(in srgb, var(--color-border) 70%, transparent)",
		},
		{
			z: 30,
			y: 76,
			scale: 0.8,
			rotate: 5,
			opacity: 0.85,
			shadow: "0 10px 24px -8px rgba(0,0,0,0.4)",
			filter: "brightness(0.88)",
			border: "color-mix(in srgb, var(--color-border) 55%, transparent)",
		},
		{
			z: 20,
			y: 118,
			scale: 0.7,
			rotate: -3,
			opacity: 0.68,
			shadow: "0 6px 16px -4px rgba(0,0,0,0.35)",
			filter: "brightness(0.82)",
			border: "color-mix(in srgb, var(--color-border) 40%, transparent)",
		},
	];
	return layers[p];
}

export default function Testimonials() {
	const [active, setActive] = useState(0);
	const [reduceMotion, setReduceMotion] = useState(false);
	const [compactStack, setCompactStack] = useState(
		() => typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches,
	);
	const n = testimonials.length;

	const stackDepth = compactStack ? STACK_DEPTH_MOBILE : STACK_DEPTH_DESKTOP;

	const goPrev = () => setActive((i) => (i - 1 + n) % n);
	const goNext = () => setActive((i) => (i + 1) % n);

	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setReduceMotion(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);

	useEffect(() => {
		const mq = window.matchMedia("(max-width: 639px)");
		const update = () => setCompactStack(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);

	/* Défilement auto : le timer repart à zéro à chaque changement d’avis (manuel ou auto). */
	useEffect(() => {
		if (reduceMotion) return;
		const id = window.setInterval(() => {
			setActive((i) => (i + 1) % n);
		}, ROTATION_MS);
		return () => window.clearInterval(id);
	}, [reduceMotion, n, active]);

	return (
		<section
			id="testimonials"
			className="relative scroll-mt-24 overflow-x-hidden overflow-y-visible py-16 md:scroll-mt-28 md:py-24"
			aria-label="Témoignages"
		>
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
								backgroundColor: "#20B2A6",
								left: `${left}%`,
								top: `${top}%`,
								animation: reduceMotion
									? "none"
									: `slow-drift ${duration}s ease-in-out infinite`,
								animationDelay: `${delay}s`,
							}}
						/>
					);
				})}
			</div>

			<div className="relative z-10 container mx-auto px-6">
				<div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
					<span className="text-sm font-medium tracking-wider text-secondary-foreground uppercase">
						Témoignages
					</span>
					<h2 className="mt-4 text-4xl font-bold text-secondary-foreground md:text-5xl">
						Ils ont travaillé avec moi
						<span className="font-serif font-normal text-white italic">
							{" "}
							— retours clients.
						</span>
					</h2>
					<p className="mt-6 text-muted-foreground leading-relaxed">
						Retours clients en profondeur : les flèches et les pastilles vous permettent de
						parcourir chaque témoignage, comme une pile qui se dévoile au fil de la navigation.
					</p>
				</div>

				<div className="mx-auto flex w-full max-w-2xl flex-col items-center px-2 sm:px-12">
					<div
						className="relative w-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-3xl"
						role="region"
						tabIndex={0}
						aria-roledescription="Carrousel"
						aria-label="Avis clients empilés. Utilisez les flèches ou les touches gauche et droite du clavier pour naviguer."
						onKeyDown={(e) => {
							if (e.key === "ArrowLeft") {
								e.preventDefault();
								goPrev();
							}
							if (e.key === "ArrowRight") {
								e.preventDefault();
								goNext();
							}
						}}
					>
						{/*
						  Très petits écrans (sous 25rem / xs) : min-h de base — les cartes sont en absolute,
						  sans hauteur le bloc s’effondre. À partir de xs, zone plus haute (téléphones classiques).
						*/}
						<div className="relative mx-auto min-h-[min(36rem,82svh)] xs:min-h-[min(28rem,78svh)] w-full max-w-lg overflow-x-hidden overflow-y-visible px-3 pb-3 perspective-[1100px] sm:min-h-[360px] sm:pb-0 sm:overflow-visible sm:px-6 md:min-h-[380px] mb-0 md:mb-30">
						{testimonials.map((t, index) => {
							const pos = (index - active + n) % n;
							const layer = stackLayer(pos, compactStack);
							const hidden = pos >= stackDepth;
							const { display: avisDisplay, truncated: avisTruncated } =
								truncateWords(t.avis, AVIS_MAX_WORDS);
							return (
								<article
									key={index}
									aria-hidden={pos !== 0}
									className={`glass absolute left-1/2 top-0 w-full max-w-lg rounded-2xl p-5 transition-[transform,opacity,box-shadow,filter,border-color] will-change-transform sm:p-8 ${
										reduceMotion
											? ""
											: "duration-950 ease-[cubic-bezier(0.25,0.9,0.35,1)]"
									} ${hidden ? "pointer-events-none" : ""} ${
										pos === 0 ? "ring-1 ring-primary/25" : ""
									}`}
									style={{
										zIndex: layer.z,
										opacity: hidden ? 0 : layer.opacity,
										boxShadow: hidden ? "none" : layer.shadow,
										filter: hidden ? "none" : layer.filter,
										borderWidth: "1px",
										borderStyle: "solid",
										borderColor: hidden ? "transparent" : layer.border,
										transform: hidden
											? "translateX(-50%) translateY(24px) scale(0.65)"
											: `translateX(-50%) translateY(${layer.y}px) rotate(${layer.rotate}deg) scale(${layer.scale})`,
										transformOrigin: "center top",
										transformStyle: "preserve-3d",
									}}
								>
									<Quote
										className="mb-4 size-6 md:size-10 text-primary/80"
										strokeWidth={1.25}
										aria-hidden
									/>
									<blockquote
										className="text-foreground/95 leading-relaxed"
										{...(avisTruncated
											? { "aria-label": t.avis }
											: {})}
									>
										<p className="text-base leading-relaxed md:text-lg">
											&ldquo;{avisDisplay}&rdquo;
										</p>
									</blockquote>
									<footer className="mt-4 sm:mt-6 border-t border-border/40 pt-3 sm:pt-5">
										<StarRating value={t.rating} />
										<p className="mt-2 font-semibold text-foreground">{t.prenom}</p>
									</footer>
								</article>
							);
						})}
						</div>

						<div className="mx-auto mt-8 flex w-full max-w-lg flex-wrap items-center justify-center gap-3 sm:mt-2 sm:gap-5">
							<button
								type="button"
								onClick={goPrev}
								aria-label="Témoignage précédent"
								className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/60 bg-surface/95 text-foreground shadow-lg backdrop-blur-sm transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:h-12 sm:w-12 cursor-pointer"
							>
								<ChevronLeft className="size-6 sm:size-7" aria-hidden />
							</button>
							<div
								className="flex min-h-10 flex-wrap items-center justify-center gap-2 px-2"
								role="tablist"
								aria-label="Choisir un témoignage"
							>
								{testimonials.map((_, index) => (
									<button
										key={index}
										type="button"
										role="tab"
										aria-label={`Afficher le témoignage ${index + 1}`}
										aria-selected={active === index}
										className={`h-2.5 rounded-full transition-all duration-300 ${
											active === index
												? "w-8 bg-primary"
												: "w-2.5 bg-muted-foreground/35 hover:bg-muted-foreground/55"
										}`}
										onClick={() => setActive(index)}
									/>
								))}
							</div>
							<button
								type="button"
								onClick={goNext}
								aria-label="Témoignage suivant"
								className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/60 bg-surface/95 text-foreground shadow-lg backdrop-blur-sm transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:h-12 sm:w-12 cursor-pointer"
							>
								<ChevronRight className="size-6 sm:size-7" aria-hidden />
							</button>
						</div>
					</div>
					{reduceMotion && (
						<p className="mt-4 text-center text-xs text-muted-foreground">
							Animation réduite : utilisez les flèches ou les points pour changer d’avis.
						</p>
					)}
				</div>
			</div>
		</section>
	);
}
