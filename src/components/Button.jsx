import React from "react";

export default function Button({ className, size, children }) {
	const baseClasses = "relative overflow-hidden rounded-full";
	return (
		<button className={className}>
			<span className="relative flex items-center justify-center gap-2">
				{children}
			</span>
		</button>
	);
}
