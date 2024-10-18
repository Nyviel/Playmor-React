import { IGame } from "@/interfaces/game";
import { GameDetailsCard } from "./GameDetailsCard";

const INCLUDE_PROPERTIES = [
	"developer",
	"publisher",
	"platforms",
	"genres",
	"modes",
	"releasedates",
];

export const GameDetails = ({ game }: { game: IGame }) => {
	return (
		<section className="flex flex-col gap-5 text-white">
			{Object.entries(game).map((entry, index) => {
				const [key, value] = entry;

				if (!INCLUDE_PROPERTIES.includes(key.toLowerCase()))
					return null;

				return (
					<GameDetailsCard title={key} content={value} key={index} />
				);
			})}
		</section>
	);
};
