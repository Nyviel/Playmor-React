import { cn } from "@/lib/utils";

export const GradientButton = ({
	type = "button",
	className,
	children,
}: {
	type?: "submit" | "reset" | "button" | undefined;
	className?: string;
	children?: React.ReactNode;
}) => {
	return (
		<button
			className={cn(
				"rounded-lg px-6 py-3 text-white bg-gradient-to-r from-[#5539cc] from-15% to-[#0066cd] backdrop-opacity-50 transition duration-500 hover:brightness-110",
				className
			)}
			type={type}
		>
			{children}
		</button>
	);
};
