import { cn } from "@/lib/utils";
import { fetchDeals } from "@/services/dealService";
import { toast } from "react-toastify";
import { Spinner } from "../utils/Spinner";
import { useQuery } from "@tanstack/react-query";

export const FreshDeals = () => {
	const {
		data: deals,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["freshDeals"],
		queryFn: () => fetchDeals(8),
		staleTime: 1000 * 60 * 60 * 24, // 1day
	});

	if (error) {
		console.error(error);
		toast.error("Failed to fetch fresh deals, err: " + error.message);
	}

	return (
		<section className="w-full h-full">
			<h2 className="text-3xl font-bold text-white text-center md:text-left">
				Fresh deals
			</h2>
			{isLoading ? (
				<Spinner loading={isLoading} color="#5539cc" />
			) : (
				<div className="grid grid-cols-1 md:grid-cols-10 md:grid-rows-2 gap-x-4 gap-y-8 h-full pb-12 pt-4">
					{deals?.map((deal, index) => {
						return (
							<article
								key={index}
								className={cn(
									!index
										? "md:col-start-1 md:col-end-6 md:row-start-1 md:row-end-2 shadow-lg shadow-yellow-400"
										: index === 1
										? "md:col-start-6 md:col-end-9 md:row-start-1 md:row-end-2 shadow-lg shadow-gray-200"
										: index === 2
										? "md:col-start-9 md:col-end-11 md:row-start-1 md:row-end-2  shadow-md shadow-orange-600"
										: "md:col-span-2 md:row-span-1 shadow-sm shadow-violet-800",
									"w-full h-full flex flex-col gap-1 justify-center items-center text-white rounded-lg  bg-black/50 hover:bg-black/5"
								)}
							>
								<img
									className="w-full h-[100px] object-cover object-center rounded-t-lg"
									src={deal.thumb}
								></img>
								<h3 className="text-lg font-semibold pt-1">
									{deal.title}
								</h3>
								<p>
									Metacritic:{" "}
									{Number(deal.metacriticScore) === 0 ? (
										"No data"
									) : (
										<span
											className={cn(
												Number(deal.metacriticScore) <
													40
													? "bg-red-500"
													: Number(
															deal.metacriticScore
													  ) < 75
													? "bg-yellow-500"
													: "bg-green-500",
												"p-1 rounded-sm inline-block mb-2"
											)}
										>
											{deal.steamRatingPercent}
										</span>
									)}
								</p>
								<p>
									Steam:{" "}
									{deal.steamAppID ? (
										<>
											{deal.steamRatingText} at{" "}
											<span
												className={cn(
													Number(
														deal.steamRatingPercent
													) < 40
														? "bg-red-500"
														: Number(
																deal.steamRatingPercent
														  ) < 70
														? "bg-yellow-500"
														: "bg-green-500",
													"p-1 rounded-sm"
												)}
											>
												{deal.steamRatingPercent}
											</span>
										</>
									) : (
										"No data"
									)}
								</p>
								<a
									className="my-2 mb-4 px-4 py-2 bg-slate-800 hover:bg-slate-600 rounded-lg text-center"
									href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
								>
									${deal.salePrice}
									<span className="line-through ms-1">
										${deal.normalPrice}
									</span>
								</a>
							</article>
						);
					})}
				</div>
			)}
		</section>
	);
};
