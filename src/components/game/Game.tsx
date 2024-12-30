import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IGame } from "@/interfaces/game";
import { fetchGameById } from "@/services/gameService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "../utils/Spinner";
import { GameDetails } from "../game/GameDetails";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css/github-markdown.css";
import { StoreIconSwitcher } from "../utils/StoreIconSwitcher";
import { Button } from "../ui/button";
import { useUser } from "@/hooks/UserHook";
import {
	deleteUserGameAsync,
	fetchUserGameTrackedStatus,
	postUserGameAsync,
} from "@/services/userGameService";
import { Select } from "../ui/custom/select";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
const scores = [
	{ label: "0", value: "0" },
	{ label: "1", value: "1" },
	{ label: "2", value: "2" },
	{ label: "3", value: "3" },
	{ label: "4", value: "4" },
	{ label: "5", value: "5" },
	{ label: "6", value: "6" },
	{ label: "7", value: "7" },
	{ label: "8", value: "8" },
	{ label: "9", value: "9" },
	{ label: "10", value: "10" },
];

const statuses = [
	{ label: "Planning to play", value: "PlanningToPlay" },
	{ label: "Playing", value: "Playing" },
	{ label: "Completed", value: "Completed" },
	{ label: "Dropped", value: "Dropped" },
];

export const Game = () => {
	const [game, setGame] = useState<IGame | null>(null);
	const [score, setScore] = useState(scores[0].value);
	const [status, setStatus] = useState(statuses[0].value);
	const [isTracked, setIsTracked] = useState(false);
	const [userGameId, setUserGameId] = useState(-1);
	const [loading, setLoading] = useState(true);
	const { gameId } = useParams();
	const { user } = useUser();
	const navigate = useNavigate();

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

	useEffect(() => {
		if (!user) return;
		const checkStatus = async () => {
			const status = await fetchUserGameTrackedStatus(
				user?.id,
				Number(gameId)
			);
			if (status) {
				setIsTracked(true);
				setUserGameId(status.id);
			}
		};
		checkStatus();
	}, [user, gameId]);

	const addToList = async () => {
		if (!user) {
			navigate("/auth/login");
			return;
		}

		const res = await postUserGameAsync({
			gameId: Number(gameId),
			userId: Number(user.id),
			score: Number(score),
			status,
		});

		if (res) {
			setUserGameId(res.id);
			setIsTracked(true);
			toast.success("Successfully added a new game to your list");
		}
	};

	const removeFromList = async () => {
		if (!user || !gameId) {
			return;
		}

		const res = await deleteUserGameAsync(userGameId);

		if (res) {
			setIsTracked(false);
			toast.success("Successfully removed game from your list");
		}
	};

	return (
		<>
			{!loading && game ? (
				<section className="flex flex-col min-h-screen">
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
						<Dialog>
							<DialogTrigger asChild>
								<Button
									disabled={isTracked}
									className={cn(
										isTracked ? "hidden" : "block",
										"my-4 hover:brightness-125"
									)}
								>
									Add to List
								</Button>
							</DialogTrigger>
							<Button
								onClick={removeFromList}
								disabled={!isTracked}
								className={cn(
									!isTracked ? "hidden" : "block",
									"my-4 hover:brightness-125"
								)}
							>
								Remove from List
							</Button>
							<DialogContent className="bg-black/90 sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>
										Add {game.title} to your list
									</DialogTitle>
									<DialogDescription>
										Select the score before adding the game.
									</DialogDescription>
								</DialogHeader>
								<div className="flex gap-5">
									<Select
										name="Score"
										value={score}
										setValue={(nV: string) => setScore(nV)}
										options={scores}
									/>

									<Select
										name="Status"
										value={status}
										setValue={setStatus}
										options={statuses}
									/>
								</div>
								<DialogFooter className="flex flex-col sm:justify-start">
									<DialogClose asChild>
										<Button
											onClick={() => addToList()}
											type="submit"
										>
											Save changes
										</Button>
									</DialogClose>
								</DialogFooter>
							</DialogContent>
						</Dialog>

						<Tabs defaultValue="details" className="w-[100%]">
							<TabsList className="bg-black/25 text-white">
								<TabsTrigger value="details">
									Details
								</TabsTrigger>
								<TabsTrigger value="comments">
									Comments
								</TabsTrigger>
								<TabsTrigger value="links"> Links </TabsTrigger>
							</TabsList>
							<TabsContent value="details">
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
