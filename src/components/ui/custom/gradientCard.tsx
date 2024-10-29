import { cn } from "@/lib/utils";

export const GradientCard = ({
	parentStyle,
	gradientStyle,
	contentStyle,
	children,
}: {
	parentStyle: string;
	gradientStyle: string;
	contentStyle: string;
	children: React.ReactNode;
}) => {
	return (
		<section className={cn("relative", parentStyle)}>
			<div
				className={cn(
					"absolute -inset-2 rounded-lg bg-gradient-to-r from-[#5539cc] from-15% to-[#0066cd] opacity-75 blur",
					gradientStyle
				)}
			></div>
			<div className={cn("relative", contentStyle)}>{children}</div>
		</section>
	);
};
