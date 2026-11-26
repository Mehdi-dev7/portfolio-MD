import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { ArrowLeft, CheckCircle2, Send, Star } from "lucide-react";
import Button from "@/components/Button";
import { COMPANY_NAME } from "@/constants/site";

/**
 * Page cachée « Laisser un avis » — accessible via `?avis` (ex. https://mon-site/?avis&projet=MeetDebrief).
 * Le client remplit le formulaire → l'avis arrive par e-mail via le MÊME template EmailJS que
 * le formulaire de contact (champs name / email / message), avec un bloc JSON prêt à coller
 * dans `src/data/testimonials.json`. Rien n'est publié automatiquement : je valide avant.
 */

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "";
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "";
const emailJsConfigured = Boolean(EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID);

// E-mail de repli si le client ne donne pas le sien (le template s'en sert comme « répondre à »)
const FALLBACK_EMAIL = "mehdi.dev77@gmail.com";
const MAX_STARS = 5;
const MIN_REVIEW_LENGTH = 20;

const inputClasses =
	"w-full rounded-xl border border-border bg-surface px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-60";

/** Message envoyé par e-mail : lisible + bloc JSON copiable tel quel. */
function buildMessage({ prenom, projet, rating, avis }) {
	const entry = JSON.stringify({ prenom, avis, rating }, null, "\t");
	return [
		`⭐ Nouvel avis client — ${"★".repeat(rating)}${"☆".repeat(MAX_STARS - rating)} (${rating}/5)`,
		`Projet : ${projet || "non précisé"}`,
		"",
		avis,
		"",
		"— À coller dans src/data/testimonials.json —",
		entry,
	].join("\n");
}

function StarPicker({ value, onChange, disabled }) {
	const [hovered, setHovered] = useState(0);
	const shown = hovered || value;

	return (
		<div className="flex gap-1" role="radiogroup" aria-label="Note sur 5" onMouseLeave={() => setHovered(0)}>
			{[...Array(MAX_STARS)].map((_, i) => {
				const n = i + 1;
				return (
					<button
						key={n}
						type="button"
						role="radio"
						aria-checked={value === n}
						aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
						disabled={disabled}
						onClick={() => onChange(n)}
						onMouseEnter={() => setHovered(n)}
						className="cursor-pointer rounded-md p-0.5 transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-primary focus:outline-none disabled:cursor-not-allowed"
					>
						<Star
							className={`size-8 ${n <= shown ? "fill-highlight text-highlight" : "fill-none text-muted-foreground/45"}`}
							strokeWidth={1.35}
							aria-hidden
						/>
					</button>
				);
			})}
		</div>
	);
}

export default function ReviewPage() {
	// Le nom du projet peut être pré-rempli par le lien : ?avis&projet=MeetDebrief
	const initialProject = new URLSearchParams(window.location.search).get("projet") ?? "";

	// Données brutes uniquement — la validation est dérivée à chaque rendu
	const [prenom, setPrenom] = useState("");
	const [email, setEmail] = useState("");
	const [projet, setProjet] = useState(initialProject);
	const [rating, setRating] = useState(0);
	const [avis, setAvis] = useState("");
	const [status, setStatus] = useState("idle"); // idle | sending | success | error

	const avisLength = avis.trim().length;
	const canSubmit =
		emailJsConfigured && prenom.trim().length > 0 && rating > 0 && avisLength >= MIN_REVIEW_LENGTH && status !== "sending";

	// Page privée : titre dédié + pas d'indexation Google
	useEffect(() => {
		document.title = `Laisser un avis — ${COMPANY_NAME || "Portfolio"}`;
		const meta = document.createElement("meta");
		meta.name = "robots";
		meta.content = "noindex, nofollow";
		document.head.appendChild(meta);
		return () => meta.remove();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!canSubmit) return;
		setStatus("sending");

		const review = { prenom: prenom.trim(), projet: projet.trim(), rating, avis: avis.trim() };
		try {
			await emailjs.send(
				EMAILJS_SERVICE_ID,
				EMAILJS_TEMPLATE_ID,
				{
					name: `${review.prenom} (avis client)`,
					email: email.trim() || FALLBACK_EMAIL,
					message: buildMessage(review),
				},
				{ publicKey: EMAILJS_PUBLIC_KEY },
			);
			setStatus("success");
		} catch (err) {
			console.error("[avis] Envoi EmailJS impossible :", err);
			setStatus("error");
		}
	};

	const isSending = status === "sending";

	return (
		<main className="relative flex min-h-screen items-center justify-center overflow-hidden px-3 py-12 sm:px-6">
			{/* Halo décoratif */}
			<div
				className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
				aria-hidden
			/>

			<div className="relative z-10 w-full max-w-xl 2xl:max-w-2xl">
				<div className="mb-8 text-center">
					<span className="text-sm font-medium tracking-wider text-secondary-foreground uppercase">
						{COMPANY_NAME || "Avis client"}
					</span>
					<h1 className="mt-3 text-3xl font-bold text-secondary-foreground sm:text-4xl">
						Votre avis{" "}
						<span className="font-serif font-normal text-white italic">compte.</span>
					</h1>
					<p className="mt-3 text-pretty text-muted-foreground">
						Merci d'avoir travaillé avec moi ! Quelques mots sur notre collaboration
						m'aideront énormément.
					</p>
				</div>

				<div className="glass rounded-3xl p-4 xs:p-6 sm:p-8">
					{status === "success" ? (
						// Écran de remerciement
						<div className="flex flex-col items-center gap-4 py-6 text-center">
							<CheckCircle2 className="size-14 text-primary" aria-hidden />
							<h2 className="text-2xl font-semibold">Merci {prenom.trim()} !</h2>
							<p className="text-muted-foreground">
								Votre avis a bien été envoyé. Il apparaîtra bientôt sur le site.
							</p>
							<a
								href="/"
								className="mt-2 inline-flex items-center gap-2 text-sm text-primary hover:underline"
							>
								<ArrowLeft className="size-4" aria-hidden />
								Voir le portfolio
							</a>
						</div>
					) : (
						<form className="space-y-6" noValidate onSubmit={handleSubmit}>
							{/* Note */}
							<div>
								<span className="mb-2 block text-sm font-medium">Votre note</span>
								<StarPicker value={rating} onChange={setRating} disabled={isSending} />
							</div>

							{/* Prénom + projet */}
							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
								<div className="min-w-0">
									<label htmlFor="prenom" className="mb-2 block text-sm font-medium">
										Prénom
									</label>
									<input
										id="prenom"
										type="text"
										autoComplete="given-name"
										placeholder="Votre prénom…"
										value={prenom}
										onChange={(e) => setPrenom(e.target.value)}
										disabled={isSending}
										className={inputClasses}
									/>
								</div>
								<div className="min-w-0">
									<label htmlFor="projet" className="mb-2 block text-sm font-medium">
										Projet <span className="text-muted-foreground">(optionnel)</span>
									</label>
									<input
										id="projet"
										type="text"
										placeholder="Ex. site vitrine"
										value={projet}
										onChange={(e) => setProjet(e.target.value)}
										disabled={isSending}
										className={inputClasses}
									/>
								</div>
							</div>

							{/* Avis */}
							<div>
								<label htmlFor="avis" className="mb-2 block text-sm font-medium">
									Votre avis
								</label>
								<textarea
									id="avis"
									rows={6}
									placeholder="Comment s'est passée notre collaboration ? Le résultat vous convient-il ?"
									value={avis}
									onChange={(e) => setAvis(e.target.value)}
									disabled={isSending}
									className={`${inputClasses} min-h-[140px] resize-none`}
								/>
								{avisLength > 0 && avisLength < MIN_REVIEW_LENGTH && (
									<p className="mt-1.5 text-xs text-highlight">
										Encore {MIN_REVIEW_LENGTH - avisLength} caractère
										{MIN_REVIEW_LENGTH - avisLength > 1 ? "s" : ""}…
									</p>
								)}
							</div>

							{/* E-mail (privé, jamais affiché) */}
							<div>
								<label htmlFor="email" className="mb-2 block text-sm font-medium">
									E-mail <span className="text-muted-foreground">(optionnel, jamais publié)</span>
								</label>
								<input
									id="email"
									type="email"
									autoComplete="email"
									placeholder="vous@exemple.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									disabled={isSending}
									className={inputClasses}
								/>
							</div>

							<p className="text-xs text-muted-foreground">
								Seuls votre prénom, votre note et votre avis seront affichés sur le site.
							</p>

							{status === "error" && (
								<p
									className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm"
									role="alert"
								>
									Envoi impossible pour le moment. Réessayez dans un instant ou
									envoyez-moi votre avis par e-mail.
								</p>
							)}

							<Button type="submit" className="w-full justify-center" disabled={!canSubmit}>
								{isSending ? "Envoi en cours…" : "Envoyer mon avis"}
								<Send className={`size-5 shrink-0 ${isSending ? "animate-pulse" : ""}`} aria-hidden />
							</Button>
						</form>
					)}
				</div>
			</div>
		</main>
	);
}
