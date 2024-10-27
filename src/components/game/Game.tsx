import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IGame } from "@/interfaces/game";
import { fetchGameById } from "@/services/gameService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "../utils/Spinner";
import { GameDetails } from "../game/GameDetails";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css/github-markdown.css";
import { StoreIconSwitcher } from "../utils/StoreIconSwitcher";

export const Game = () => {
	const [game, setGame] = useState<IGame | null>(null);
	const [loading, setLoading] = useState(true);
	const { gameId } = useParams();

	useEffect(() => {
		try {
			const getGame = async () => {
				const data = await fetchGameById(Number(gameId));
				if (data) {
					setGame(data);
				} else {
					console.error("Failed to fetch game of id: " + gameId);
					toast.error(
						"Failed to get game, try again later server might be down."
					);
				}
			};
			getGame();
		} catch (error) {
			console.error("Failed to fetch game:", error);
			toast.error(
				"Failed to get game, try again later server might be down."
			);
		} finally {
			setLoading(false);
		}
	}, [gameId]);

	return (
		<>
			{!loading && game ? (
				<section className="flex flex-col">
					<img
						src={game.artwork}
						className="banner absolute left-0 top-0 w-full h-[600px] object-cover object-center -z-10 filter blur-[2px] brightness-[50%]"
					/>
					<div className="container mx-auto my-12">
						<h1 className="text-6xl text-white font-bold my-12">
							{game.title}
						</h1>
						<p className="text-xl text-gray-200 mb-12">
							{game.description}
						</p>
						<Tabs defaultValue="information" className="w-[100%]">
							<TabsList className="bg-black/25 text-white">
								<TabsTrigger value="information">
									Information
								</TabsTrigger>
								<TabsTrigger value="comments">
									Comments
								</TabsTrigger>
								<TabsTrigger value="links"> Links </TabsTrigger>
							</TabsList>
							<TabsContent value="information">
								<div className="grid grid-cols-3 gap-4 mt-12">
									<div className="col-span-2">
										<div className="markdown bg-black/35 text-white px-6 pb-6 rounded-lg border border-white">
											<Markdown
												className="markdown-body !bg-transparent pt-5"
												remarkPlugins={[remarkGfm]}
											>
												{game.details}
											</Markdown>
										</div>
									</div>
									<div className="col-span-1">
										<GameDetails game={game} />
									</div>
								</div>
							</TabsContent>
							<TabsContent value="comments">
								<p>Comments not yet implemented.</p>
							</TabsContent>
							<TabsContent value="links">
								<ul className="flex pt-6 gap-8">
									{game.websiteLinks.map((link) => {
										return (
											<li
												className="text-white"
												key={link.toString()}
											>
												<a
													target="_blank"
													href={link.websiteLink}
												>
													<StoreIconSwitcher
														iconName={
															link.websiteName
														}
													/>
												</a>
											</li>
										);
									})}
								</ul>
							</TabsContent>
						</Tabs>
					</div>
				</section>
			) : (
				<Spinner color="#5539cc" loading={loading} />
			)}
		</>
	);
};
