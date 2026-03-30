import { createElement } from "react";
import { Download } from "lucide-react";

const baseClassName =
	"group relative cursor-pointer overflow-visible rounded-full border border-border bg-transparent px-8 py-4 text-lg font-medium text-foreground transition-all duration-1000 hover:border-primary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 animated-border";

export default function AnimatedBorderButton({
	className = "",
	children = "Télécharger mon CV",
	icon = Download,
	href,
}) {
	const inner = (
		<>
			{/* Bordure animée : <rect> = même arrondi partout (évite les pointes des arcs manuels) */}
			<svg
				className="animated-border-svg pointer-events-none absolute inset-0 size-full overflow-visible"
				viewBox="0 0 200 60"
				preserveAspectRatio="none"
				aria-hidden
			>
				<rect
					className="animated-border-path"
					x="1"
					y="1"
					width="198"
					height="58"
					rx="29"
					ry="29"
					pathLength="1000"
					fill="none"
					stroke="var(--color-primary)"
					strokeWidth="2"
					strokeDasharray="400 600"
					strokeDashoffset="0"
					strokeLinecap="butt"
					strokeLinejoin="round"
				/>
			</svg>
			<span className="relative z-10 flex items-center justify-center gap-2">
				{children}
				{createElement(icon, { size: 20, "aria-hidden": true })}
			</span>
		</>
	);

	const combinedClass = `${baseClassName} ${className}`.trim();

	if (href) {
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className={combinedClass}
			>
				{inner}
			</a>
		);
	}

	return (
		<button type="button" className={combinedClass}>
			{inner}
		</button>
	);
}
