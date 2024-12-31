import { GradientCard } from "../ui/custom/gradientCard";

interface ProfileStatsCardProps {
	title: string;
	value: number;
}

export const ProfileStatsCard = ({ title, value }: ProfileStatsCardProps) => {
	return (
		<li>
			<GradientCard
				parentStyle="w-full h-fit flex justify-center items-start"
				gradientStyle="opacity-75"
				contentStyle="w-full h-full p-4 text-center"
			>
				<h4 className="text-base md:text-lg font-bold border-b border-white pb-2">
					{title}
				</h4>
				<p className="text-lg font-semibold pt-2">{value}</p>
			</GradientCard>
		</li>
	);
};
