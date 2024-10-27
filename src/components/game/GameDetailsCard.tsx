import { useEffect, useState } from "react";
import { ReleaseDate } from "@/interfaces/game";

interface IGameDetailsCardProps {
	title: string;
	content: string[];
}

export const GameDetailsCard = ({ title, content }: IGameDetailsCardProps) => {
	const [data, setData] = useState<string[]>([]);

	// Handle release dates passed as they're
	// different type than string array.
	useEffect(() => {
		if (title.toLowerCase() == "releasedates") {
			const cast = content as unknown as ReleaseDate[];
			setData(
				cast.map((date) => {
					return `${date.platform} - ${new Date(
						date.date
					).toDateString()}`;
				})
			);
		} else {
			setData(content);
		}
	}, [title, content]);

	return (
		<article className="bg-black/35 h-fit p-5 rounded-lg text-center border border-white shadow-sm shadow-white">
			<h3 className="font-bold text-xl pb-2">
				{title.at(0)?.toUpperCase() + title.slice(1, title.length)}
			</h3>
			<ul className="flex flex-col gap-1">
				{data.map((row, index) => {
					return <li key={index}>{row}</li>;
				})}
			</ul>
		</article>
	);
};
