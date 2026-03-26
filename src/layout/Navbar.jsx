import Button from "@/components/Button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
	{ href: "#about", label: "À propos" },
	{ href: "#projets", label: "Projets" },
	{ href: "#experience", label: "Expérience" },
	{ href: "#testimonials", label: "Témoignages" },
];

function scrollToHash(href) {
	const id = href.replace(/^#/, "");
	const el = document.getElementById(id);
	if (el) {
		el.scrollIntoView({ behavior: "smooth", block: "start" });
		window.history.replaceState(null, "", href);
	}
}

export default function Navbar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isScroll, setIsScroll] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScroll(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	return (
		<header className={`fixed top-0 left-0 right-0 transition-all duration-200 ease-in-out z-50  ${isScroll ? "glass-strong py-3" : "bg-transparent py-5"}`}>
			<nav className="container mx-auto px-6 flex items-center justify-between">
				<a
					href="#"
					className="text-xl font-bold tracking-tight text-white hover:text-primary"
				>
					WD <span className="text-primary">.</span>
				</a>
				{/* Desktop Nav */}

				<div className="hidden md:flex items-center gap-1">
					<div className="glass rounded-full px-2 py-1 flex items-center gap-1">
						{navLinks.map((link, index) => (
							<a
								key={index}
								href={link.href}
								className="px-4 py-2 text-sm text-white/70 hover:text-white rounded-full hover:bg-primary/20"
								onClick={(e) => {
									e.preventDefault();
									scrollToHash(link.href);
								}}
							>
								{link.label}
							</a>
						))}
					</div>
				</div>

				{/* CTA Button */}
				<div className="hidden md:block">
					<Button size="sm">Contactez-Moi</Button>
				</div>

				{/* Mobile Menu button */}
				<button
					type="button"
					className="md:hidden p-2 text-foreground cursor-pointer"
					aria-expanded={isMobileMenuOpen}
					aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
					onClick={() => setIsMobileMenuOpen((prev) => !prev)}
				>
					{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</nav>

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<div className="md:hidden glass-strong animate-fade-in">
					<div className="container mx-auto px-6 py-6 flex flex-col gap-4">
						{navLinks.map((link, index) => (
							<a
								key={index}
								href={link.href}
								className="text-lg text-muted-foreground hover:text-foreground py-2"
								onClick={(e) => {
									e.preventDefault();
									scrollToHash(link.href);
									setIsMobileMenuOpen(false);
								}}
							>
								{link.label}
							</a>
						))}
						<Button onClick={() => setIsMobileMenuOpen(false)}>Contactez-Moi</Button>
					</div>
				</div>
			)}
		</header>
	);
}
