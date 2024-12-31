import "@/assets/css/Explore.css";
import { IGame } from "@/interfaces/game";
import { fetchGamesPaginated } from "@/services/gameService";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { ExploreFilters } from "./ExploreFilters";
import { ExploreResultsPagination } from "./ExploreResultsPagination";
import { ExploreResults } from "./ExploreResults";
import { Spinner } from "../utils/Spinner";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronsUpDown } from "lucide-react";
import { CollapsibleContent } from "@radix-ui/react-collapsible";

export interface IQueryParams {
	pageNumber: number;
	sortBy: string;
	fromDate: string;
	toDate: string;
	keyword: string;
	modes: string[];
	genres: string[];
	platforms: string[];
	developers: string[];
	publishers: string[];
}

export const Explore = () => {
	const [searchParams] = useSearchParams();
	const [isOpen, setIsOpen] = useState(true);
	const queryParams = useMemo(
		() => ({
			pageNumber: Number(searchParams.get("pageNumber")) || 1,
			sortBy: searchParams.get("sortBy") || "releasedDescending",
			fromDate: searchParams.get("DateRange.From") || "",
			toDate: searchParams.get("DateRange.To") || "",
			keyword: searchParams.get("Keyword") || "",
			modes: searchParams.getAll("Modes"),
			genres: searchParams.getAll("Genres"),
			platforms: searchParams.getAll("Platforms"),
			developers: searchParams.getAll("Developers"),
			publishers: searchParams.getAll("Publishers"),
		}),
		[searchParams]
	);

	const navigate = useNavigate();
	const location = useLocation();

	const [loading, setLoading] = useState(true);
	const [results, setResults] = useState<IGame[]>([]);
	const [totalRecords, setTotalRecords] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	const navigateOnPageChange = (cPage: number) => {
		const currentParams = new URLSearchParams(location.search);

		currentParams.delete("pageNumber");

		const current = currentParams.toString()
			? `&${currentParams.toString()}`
			: "";

		navigate(`/explore?pageNumber=${cPage}${current}`);
	};

	useEffect(() => {
		try {
			const getResults = async () => {
				const data = await fetchGamesPaginated(queryParams);
				setResults(data.games);
				setTotalPages(data.totalPages);
				setTotalRecords(data.totalRecords);
				setLoading(false);
			};
			setLoading(true);
			getResults();
		} catch (error) {
			console.error("Something went wrong fetching results" + error);
		}
	}, [queryParams]);

	return (
		<section className="flex flex-col pb-24">
			<div className="flex justify-between items-end mt-10 pl-1 border-b border-white/50 w-full">
				<div className="pb-4">
					{results.length > 0 && (
						<ExploreResultsPagination
							page={queryParams.pageNumber}
							totalPages={totalPages}
							changePage={navigateOnPageChange}
						/>
					)}
				</div>
				<div className="pb-4">Results ({totalRecords})</div>
			</div>
			<div className="grid grid-cols-4 w-full h-full">
				<div className="order-2 flex flex-wrap justify-center p-5 gap-10 col-span-4 lg:col-span-3 border-b bg-slate-600/30 rounded overflow-y-auto">
					{loading && !results.length ? (
						<Spinner loading={loading} color={"#5539cc"} />
					) : (
						<ExploreResults results={results} />
					)}
				</div>

				<div className="order-1 col-span-4 lg:col-span-1 border-b border-l bg-slate-800/30 rounded">
					<Collapsible
						open={isOpen}
						onOpenChange={setIsOpen}
						className="w-full h-full"
					>
						<div className="flex items-center justify-between my-2 px-4">
							<h4 className="text-base font-semibold">Filters</h4>
							<CollapsibleTrigger asChild>
								<Button variant="ghost" size="sm">
									<ChevronsUpDown className="h-4 w-4" />
									<span className="sr-only">Toggle</span>
								</Button>
							</CollapsibleTrigger>
						</div>
						<CollapsibleContent className="space-y-2">
							<ExploreFilters queryParams={queryParams} />
						</CollapsibleContent>
					</Collapsible>
				</div>
			</div>
		</section>
	);
};
