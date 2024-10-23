import "@/assets/css/Explore.css";
import { IGame } from "@/interfaces/game";
import { fetchGamesPaginated } from "@/services/gameService";
import { FormEvent, useEffect, useState } from "react";
import {
	Link,
	useLocation,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "./ui/pagination";

export const Explore = () => {
	const [searchParams] = useSearchParams();
	const page = Number(searchParams.get("page")) || 1;
	const sortBy = searchParams.get("sortBy") || "releasedDescending";
	const fromDate = searchParams.get("fromDate") || "";
	const toDate = searchParams.get("toDate") || "";

	const navigate = useNavigate();
	const location = useLocation();

	const [filters, setFilters] = useState({
		sortOption: sortBy || "releasedDescending",
		fromDate: new Date(0).toISOString().split("T")[0],
		toDate: new Date().toISOString().split("T")[0],
	});

	const [results, setResults] = useState<IGame[]>([]);
	const [totalRecords, setTotalRecords] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	const onFiltersSubmit = (e: FormEvent) => {
		e.preventDefault();
		const { sortOption, fromDate, toDate } = filters;
		navigate(
			`/explore?page=${page}&sortBy=${sortOption}&fromDate=${fromDate}&toDate=${toDate}`
		);
	};

	const navigateOnPageChange = (cPage: number) => {
		const currentParams = new URLSearchParams(location.search);

		// Remove the 'page' parameter from the search params
		currentParams.delete("page");

		// Create the current string with remaining search params
		const current = currentParams.toString()
			? `&${currentParams.toString()}`
			: "";

		navigate(`/explore?page=${cPage}${current}`);
	};

	useEffect(() => {
		const getResults = async () => {
			const data = await fetchGamesPaginated(
				page,
				sortBy,
				fromDate,
				toDate
			);
			setResults(data.games);
			setTotalPages(data.totalPages);
			setTotalRecords(data.totalRecords);
		};
		getResults();
	}, [page, sortBy, fromDate, toDate]);

	return (
		<section className="h-screen flex flex-col pb-24">
			<div className="flex justify-between items-end mt-10 pl-1 border-b border-white/50 w-full">
				<div className="pb-4">
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									onClick={() => {
										if (page > 1)
											navigateOnPageChange(page - 1);
									}}
								/>
							</PaginationItem>
							{Array.from(
								{ length: totalPages },
								(_, i) => i
							).map((i) => {
								const isActive = i + 1 == page;
								return (
									<PaginationItem key={i}>
										<PaginationLink
											onClick={() => {
												navigateOnPageChange(i + 1);
											}}
											isActive={isActive}
										>
											{i + 1}
										</PaginationLink>
									</PaginationItem>
								);
							})}
							<PaginationItem>
								<PaginationNext
									onClick={() => {
										if (page < totalPages)
											navigateOnPageChange(page + 1);
									}}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
				<div className="pb-4">Results ({totalRecords})</div>
			</div>
			<div className="grid grid-cols-4 w-full h-full">
				<div className="flex flex-wrap justify-center p-5 gap-10 col-span-3 border-b bg-white/10 rounded overflow-y-auto">
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
						<div className="w-full h-full flex justify-center items-center">
							No results...
						</div>
					)}
				</div>
				<div className="col-span-1 border-b border-l bg-white/15 rounded">
					<form className="flex flex-col w-full p-4">
						<div className="flex flex-col border-b border-white mb-2 pb-2">
							<label htmlFor="sortby">Sort by</label>
							<select
								className="my-1 px-4 py-2 rounded"
								name="sortby"
								id="sortby"
								value={filters.sortOption}
								onChange={(e) => {
									setFilters((prev) => ({
										...prev,
										sortOption: e.target.value,
									}));
								}}
							>
								<option value="addedDescending">
									Descending by added date
								</option>
								<option value="addedAscending">
									Ascending by added date
								</option>
								<option value="releasedDescending">
									Descending by released date
								</option>
								<option value="releasedAscending">
									Ascending by released date
								</option>
							</select>
						</div>

						<div className="pb-3 mb-2 border-b border-white">
							<div className="flex gap-2 justify-between">
								<div className="flex flex-col w-fit">
									<label className="pb-1" htmlFor="fromDate">
										From
									</label>
									<input
										type="date"
										name="fromDate"
										id="fromDate"
										onChange={(e) => {
											setFilters((prev) => ({
												...prev,
												fromDate: e.target.value,
											}));
										}}
										value={filters.fromDate}
										className="px-4 py-2 rounded"
									/>
								</div>

								<div className="flex flex-col w-fit">
									<label className="pb-1" htmlFor="toDate">
										To
									</label>
									<input
										type="date"
										name="toDate"
										id="toDate"
										onChange={(e) => {
											setFilters((prev) => ({
												...prev,
												toDate: e.target.value,
											}));
										}}
										value={filters.toDate}
										className="px-4 py-2 rounded"
									/>
								</div>
							</div>
						</div>
						<button
							onClick={onFiltersSubmit}
							className="rounded-lg mt-3 px-6 py-3 bg-gradient-to-r from-[#5539cc] from-15% to-[#0066cd] backdrop-opacity-50 hover:brightness-110"
						>
							Apply filters
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};
