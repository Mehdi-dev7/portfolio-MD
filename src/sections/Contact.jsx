import Button from "@/components/Button";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import emailjs from "@emailjs/browser";
import { Mail, MapPin, Send } from "lucide-react";
import React, { useState } from "react";

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "";
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "";

const emailJsConfigured =
	Boolean(EMAILJS_PUBLIC_KEY) &&
	Boolean(EMAILJS_SERVICE_ID) &&
	Boolean(EMAILJS_TEMPLATE_ID);

/** Aligné sur About : positions stables pour les points (pas de Math.random au rendu). */
function dotVariation(index, salt) {
	const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
	return x - Math.floor(x);
}

const contactInfo = [
	{
		icon: <Mail size={20} />,
		label: "E-mail",
		value: "mehdi.dev77@gmail.com",
		href: "mailto:mehdi.dev77@gmail.com",
	},
	{
		icon: <WhatsAppIcon size={20} />,
		label: "WhatsApp",
		value: "+33 6 50 15 70 32",
		href: "https://wa.me/33650157032",
	},
	{
		icon: <MapPin size={20} />,
		label: "Adresse",
		value: "7 Allée André Malraux, 93430 Villetaneuse, France",
		href: "https://maps.app.goo.gl/J2F2VyNnW3TjT1rE6",
	},
];

export default function Contact() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [formStatus, setFormStatus] = useState(null);

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
		setFormStatus(null);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!emailJsConfigured) return;

		setIsLoading(true);
		setFormStatus(null);

		try {
			await emailjs.send(
				EMAILJS_SERVICE_ID,
				EMAILJS_TEMPLATE_ID,
				{
					name: formData.name.trim(),
					email: formData.email.trim(),
					message: formData.message.trim(),
				},
				{ publicKey: EMAILJS_PUBLIC_KEY },
			);
			setFormStatus("success");
			setFormData({ name: "", email: "", message: "" });
		} catch (err) {
			console.error("EmailJS:", err);
			setFormStatus("error");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section
			id="contact"
			className="relative scroll-mt-24 overflow-hidden py-16 md:scroll-mt-28"
			aria-label="Contact"
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
								animation: `slow-drift ${duration}s ease-in-out infinite`,
								animationDelay: `${delay}s`,
							}}
						/>
					);
				})}
			</div>

			<div className="relative z-10 container mx-auto px-6">
				<div className="mx-auto mb-16 max-w-3xl text-center">
					<span className="animate-fade-in text-sm font-medium tracking-wider text-secondary-foreground uppercase">
						Contact
					</span>
					<h2 className="animation-delay-100 mt-4 mb-6 animate-fade-in text-4xl font-bold text-secondary-foreground md:text-5xl">
						Construisons ensemble
						<span className="font-serif font-normal text-white italic">
							{" "}
							quelque chose de grand.
						</span>
					</h2>
					<p className="animation-delay-200 animate-fade-in text-muted-foreground">
						Un projet en tête ? J’aimerais en discuter. Envoyez-moi un message
						et voyons comment collaborer.
					</p>
				</div>

				<div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-12 lg:grid-cols-2">
					{/* Contact Info */}
					<div className="animation-delay-400 animate-fade-in space-y-6 lg:order-2 ">
						<div className="glass rounded-3xl p-8 border border-primary/30">
							<h3 className="text-xl font-semibold mb-6">Informations de contact</h3>
							<div className="space-y-4">
								{contactInfo.map((item) => (
									<a
										key={item.label}
										href={item.href}
										className="flex items-center gap-4 rounded-xl border border-primary/30 p-4 transition-colors hover:bg-surface group"
									>
										<span className="mt-0.5 shrink-0 text-primary">
											{item.icon}
										</span>
										<div>
											<p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
												{item.label}
											</p>
											<p className="mt-1 text-sm text-foreground">
												{item.value}
											</p>
										</div>
									</a>
								))}
							</div>
						</div>
            {/* Availability Card */}
            <div className="glass rounded-3xl p-8 border border-primary/30">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                <span className="font-medium"></span>
              </div>
              <p className="text-sm text-muted-foreground">
              Je suis actuellement ouvert aux nouvelles opportunités et aux projets stimulants.Que vous cherchiez un developpeur à temps plein ou un consultant freelance, discutons-en!
              </p>
            </div>
					</div>
					{/* Contact Form */}
					<div className="glass animation-delay-300 animate-fade-in rounded-3xl border border-primary/30 p-8 lg:order-1">
						{!emailJsConfigured && (
							<p
								className="mb-4 rounded-xl border border-highlight/40 bg-highlight/10 px-4 py-3 text-sm text-muted-foreground"
								role="status"
							>
								<strong className="text-foreground">
									Configuration EmailJS :
								</strong>{" "}
								créez un fichier{" "}
								<code className="rounded bg-surface px-1 text-xs text-primary">
									.env
								</code>{" "}
								à la racine à partir de{" "}
								<code className="rounded bg-surface px-1 text-xs">
									.env.example
								</code>
								, puis renseignez la clé publique, le service et le modèle
								(variables <code className="text-xs text-primary">name</code>,{" "}
								<code className="text-xs text-primary">email</code>,{" "}
								<code className="text-xs text-primary">message</code> dans le
								template EmailJS).
							</p>
						)}
						<form className="space-y-6" noValidate onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor="name"
									className="mb-2 block text-sm font-medium"
								>
									Nom
								</label>
								<input
									type="text"
									id="name"
									name="name"
									required
									autoComplete="name"
									placeholder="Votre nom…"
									value={formData.name}
									onChange={handleChange}
									disabled={isLoading}
									className="w-full rounded-xl border border-border bg-surface px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-60"
								/>
							</div>
							<div>
								<label
									htmlFor="email"
									className="mb-2 block text-sm font-medium"
								>
									E-mail
								</label>
								<input
									type="email"
									id="email"
									name="email"
									required
									autoComplete="email"
									placeholder="vous@exemple.com"
									value={formData.email}
									onChange={handleChange}
									disabled={isLoading}
									className="w-full rounded-xl border border-border bg-surface px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-60"
								/>
							</div>
							<div>
								<label
									htmlFor="message"
									className="mb-2 block text-sm font-medium"
								>
									Message
								</label>
								<textarea
									rows={5}
									id="message"
									name="message"
									required
									placeholder="Décrivez votre projet ou votre demande…"
									value={formData.message}
									onChange={handleChange}
									disabled={isLoading}
									className="min-h-[120px] w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-60"
								/>
							</div>

							{formStatus === "success" && (
								<p
									className="rounded-xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-foreground"
									role="status"
								>
									Message envoyé. Merci, je vous réponds dès que possible.
								</p>
							)}
							{formStatus === "error" && (
								<p
									className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-foreground"
									role="alert"
								>
									Envoi impossible pour le moment. Réessayez plus tard ou
									écrivez-moi directement par e-mail.
								</p>
							)}

							<Button
								type="submit"
								className="w-full justify-center"
								size="lg"
								disabled={isLoading || !emailJsConfigured}
							>
								{isLoading ? (
									<>
										Envoi en cours…
										<span className="size-5 shrink-0 animate-pulse" aria-hidden>
											<Send className="size-5 opacity-70" />
										</span>
									</>
								) : (
									<>
										Envoyer
										<Send className="size-5 shrink-0" aria-hidden />
									</>
								)}
							</Button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
