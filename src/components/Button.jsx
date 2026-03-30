import React from "react";

export default function Button({
	className = "",
	size = "md",
	type = "button",
	children,
	...props
}) {
	const baseClasses =
		"relative cursor-pointer overflow-hidden rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-colors duration-300 hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50";

	const sizeClasses = {
		sm: "px-4 py-2 text-sm",
		md: "px-6 py-3 text-base",
		lg: "px-8 py-4 text-lg",
	};

	const classes = `${baseClasses} ${className} ${sizeClasses[size] || sizeClasses.md}`;
	return (
		<button type={type} className={classes} {...props}>
			<span className="relative flex items-center justify-center gap-2">
				{children}
			</span>
		</button>
	);
}
