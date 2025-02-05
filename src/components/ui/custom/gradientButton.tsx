import { cn } from "@/lib/utils";
import { MouseEventHandler } from "react";

export const GradientButton = ({
	type = "button",
	className,
	children,
	onClick,
	disabled,
}: {
	type?: "submit" | "reset" | "button" | undefined;
	className?: string;
	children?: React.ReactNode;
	onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
	disabled?: boolean;
}) => {
	return (
		<button
			className={cn(
				"rounded-lg px-6 py-3 text-white bg-gradient-to-r from-[#5539cc] from-15% to-[#0066cd] backdrop-opacity-50 transition duration-500 hover:brightness-110",
				className
			)}
			type={type}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};
