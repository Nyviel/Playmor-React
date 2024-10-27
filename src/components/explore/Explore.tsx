import "@/assets/css/Explore.css";
import { IGame } from "@/interfaces/game";
import { fetchGamesPaginated } from "@/services/gameService";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { ExploreFilters } from "./ExploreFilters";
import { ExploreResultsPagination } from "./ExploreResultsPagination";
import { ExploreResults } from "./ExploreResults";
import { Spinner } from "../utils/Spinner";

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

	// Fetches results on query params change
	useEffect(() => {
		try {
			const getResults = async () => {
				const data = await fetchGamesPaginated(queryParams);
				setResults(data.games);
				setTotalPages(data.totalPages);
				setTotalRecords(data.totalRecords);
			};
			setLoading(true);
			getResults();
		} catch (error) {
			console.error("Something went wrong fetching results" + error);
		} finally {
			setLoading(false);
		}
	}, [queryParams]);

	return (
		<section className="h-screen flex flex-col pb-24">
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
				<div className="flex flex-wrap justify-center p-5 gap-10 col-span-3 border-b bg-white/10 rounded overflow-y-auto">
					{loading && !results.length ? (
						<Spinner loading={loading} color={"#5539cc"} />
					) : (
						<ExploreResults results={results} />
					)}
				</div>
				<div className="col-span-1 border-b border-l bg-white/15 rounded">
					<ExploreFilters queryParams={queryParams} />
				</div>
			</div>
		</section>
	);
};
