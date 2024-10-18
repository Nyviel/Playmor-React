import { IGame } from "@/interfaces/game";
import { fetchGamesByAddedDate } from "@/services/gameService";
import { API } from "@/utilities/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "./Spinner";

export const RecentlyAdded = () => {
	const [recentGames, setRecentGames] = useState<IGame[]>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		try {
			const getRecentGames = async () => {
				const games = await fetchGamesByAddedDate("desc");
				if (games) {
					setRecentGames(games);
				} else {
					console.error("Failed to fetch games");
					toast.error("Failed to fetch recently added games");
				}
			};
			getRecentGames();
		} catch (error) {
			console.error(error);
			toast.error("Failed to fetch recently added games");
		} finally {
			setLoading(false);
		}
	}, []);

	return (
		<section>
			{!loading && recentGames ? (
				<>
					<h2 className="text-3xl mt-12 font-bold text-white">
						Recently added
					</h2>

					<div className="flex flex-col gap-12 my-8">
						{recentGames?.map((game, index) => {
							return (
								<article key={index}>
									<Link to={`/game/${game.id}`}>
										<div className="border-gray-300 text-white grid grid-cols-3 gap-6 bg-[#111] hover:bg-[#222]">
											<div className="h-[300px] w-[210px] border border-violet-500 card">
												<img
													src={`${API}/proxy-image?imageUrl=${encodeURIComponent(
														game.cover
													)}`}
													crossOrigin="anonymous"
													alt=""
												/>
											</div>
											<div className="flex justify-center items-center">
												<h3 className="text-2xl">
													{game.title}
												</h3>
											</div>
											<div className="flex justify-center items-center">
												<p className="text-lg pe-4">
													{new Date(
														game.createdAt
													).toLocaleDateString()}
												</p>
											</div>
										</div>
									</Link>
								</article>
							);
						})}
					</div>
				</>
			) : (
				<Spinner loading={loading} color="#5539cc" />
			)}
		</section>
	);
};
