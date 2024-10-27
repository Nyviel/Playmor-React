import { IGame } from "@/interfaces/game";
import { Link } from "react-router-dom";
import NoResultsImg from "@/assets/images/resultsnotfound.webp";

export const ExploreResults = ({ results }: { results: IGame[] }) => {
	return (
		<>
			{results.map((result, index) => {
				return (
					<Link
						to={`/game/${result.id}`}
						key={index}
						className="card h-[350px] w-[300px] border border-white"
					>
						<img
							src={result.cover}
							className="w-full h-full object-cover object-center"
						/>
					</Link>
				);
			})}
			{!results.length && (
				<div className="w-full h-full flex flex-col justify-center items-center">
					<img
						className="h-[300px] w-[300px] object-cover object-center rounded-lg mb-4"
						src={NoResultsImg}
						alt="No results found image"
					/>
					<p>
						Nothing here but empty void, try to tweak your
						filters...
					</p>
				</div>
			)}
		</>
	);
};
