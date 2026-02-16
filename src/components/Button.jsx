import React from "react";

export default function Button({ className = "", size = "md", children }) {

	const baseClasses = "relative overflow-hidden rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 transition-colors duration-300 cursor-pointer";

	const sizeClasses = {
		sm: "px-4 py-2 text-sm",
		md: "px-6 py-3 text-base",
		lg: "px-8 py-4 text-lg",
	};

	const classes = `${baseClasses} ${className} ${sizeClasses[size] || sizeClasses["md"]}`;
	return (
		<button className={classes}>
			<span className="relative flex items-center justify-center gap-2">
				{children}
			</span>
		</button>
	);
}
