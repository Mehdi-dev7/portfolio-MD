import { ArrowUpRight, Github } from "lucide-react";

export default function ProjectCard({ project, index }) {
	return (
		<div
			className="overflow-hidden animate-fade-in md:row-span-1"
			style={{ animationDelay: index != null ? `${(index + 1) * 100}ms` : undefined }}
		>
			{/* Calque image (z-0) séparé : le scale reste sous l’overlay. Hover via CSS natif (pas group-hover). */}
			<div
				className="relative aspect-video overflow-hidden isolate hover:[&_.pc-overlay]:opacity-100 hover:[&_.pc-img]:scale-110"
			>
				<div className="absolute inset-0 z-0 overflow-hidden">
					<img
						src={project.image}
						alt={project.title}
						className="pc-img h-full w-full object-cover transition-transform duration-700"
					/>
				</div>
				<div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-card via-card/50 to-transparent opacity-60" />
				<div className="pc-overlay pointer-events-auto absolute inset-0 z-20 flex items-center justify-center gap-4 opacity-0 transition-opacity duration-300">
					<a
						href={project.link}
						target="_blank"
						rel="noopener noreferrer"
						className="p-3 rounded-full glass transition-all hover:bg-primary hover:text-primary-foreground"
					>
						<ArrowUpRight size={20} />
					</a>
					<a
						href={project.github}
						target="_blank"
						rel="noopener noreferrer"
						className="p-3 rounded-full glass transition-all hover:bg-primary hover:text-primary-foreground"
					>
						<Github size={20} />
					</a>
				</div>
			</div>
		</div>
	);
}
