import { GameFilter } from "@/interfaces/gameFilter";
import {
	fetchAvailableModes,
	fetchAvailableGenres,
	fetchAvailablePlatforms,
	fetchAvailableDevelopers,
	fetchAvailablePublishers,
} from "@/services/gameService";
import { useState, FormEvent, useEffect } from "react";
import { IQueryParams } from "./Explore";
import { useNavigate } from "react-router-dom";
import { urlBuilder } from "@/utilities/urlBuilder";
import MultiSelect from "../ui/custom/multiSelect";
import { IFilterOptions } from "@/interfaces/filterOptions";
import { Select } from "../ui/custom/select";
import { Input } from "../ui/custom/input";

const sortOptions = [
	{ label: "Descending by added date", value: "addedDescending" },
	{ label: "Ascending by added date", value: "addedAscending" },
	{ label: "Descending by released date", value: "releasedDescending" },
	{ label: "Ascending by released date", value: "releasedAscending" },
];

export const ExploreFilters = ({
	queryParams,
}: {
	queryParams: IQueryParams;
}) => {
	const navigate = useNavigate();
	const [sortOption, setSortOption] = useState(
		queryParams.sortBy || "releasedDescending"
	);

	const [filters, setFilters] = useState<GameFilter>({
		fromDate:
			queryParams.fromDate || new Date(0).toISOString().split("T")[0],
		toDate: queryParams.toDate || new Date().toISOString().split("T")[0],
		keyword: queryParams.keyword || "",
		modes: queryParams.modes,
		genres: queryParams.genres,
		platforms: queryParams.platforms,
		developers: queryParams.developers,
		publishers: queryParams.publishers,
	});

	const [filterOptions, setFilterOptions] = useState<IFilterOptions>({
		modes: [],
		genres: [],
		platforms: [],
		developers: [],
		publishers: [],
	});

	const onFiltersSubmit = (e: FormEvent) => {
		e.preventDefault();

		const urlParamsString = urlBuilder({
			pageNumber: queryParams.pageNumber,
			sortBy: sortOption,
			...filters,
		});

		navigate(`/explore?${urlParamsString}`);
	};

	useEffect(() => {
		const getFilterOptions = async () => {
			const [modes, genres, platforms, developers, publishers] =
				await Promise.all([
					fetchAvailableModes(),
					fetchAvailableGenres(),
					fetchAvailablePlatforms(),
					fetchAvailableDevelopers(),
					fetchAvailablePublishers(),
				]);

			setFilterOptions({
				modes,
				genres,
				platforms,
				developers,
				publishers,
			});
		};
		getFilterOptions();
	}, []);

	return (
		<form className="flex flex-col w-full p-4">
			<Select
				name="Sort by"
				value={sortOption}
				setValue={(newValue: string) => setSortOption(newValue)}
				options={sortOptions}
			/>

			<div className="pb-3 mb-2 border-b border-white">
				<div className="flex flex-col 2xl:flex-row gap-2 justify-between">
					<Input
						name="From"
						value={filters.fromDate}
						setValue={(newValue: string) => {
							setFilters((prev) => ({
								...prev,
								fromDate: newValue,
							}));
						}}
						inputType="date"
					/>
					<Input
						name="To"
						value={filters.toDate}
						setValue={(newValue: string) => {
							setFilters((prev) => ({
								...prev,
								toDate: newValue,
							}));
						}}
						inputType="date"
					/>
				</div>
			</div>

			<div className="pb-3 mb-2 border-b border-white">
				<Input
					name="Keyword"
					value={filters.keyword}
					setValue={(newValue: string) => {
						setFilters((prev) => ({
							...prev,
							keyword: newValue,
						}));
					}}
					inputType="text"
					placeholder="Adventure, big fights, etc..."
				/>
			</div>
			<div className="pb-3 mb-2 border-b border-white">
				<MultiSelect
					label="Modes"
					placeholder={
						filters.modes.length
							? filters.modes.join(", ")
							: "Select Modes..."
					}
					selectedOptions={filters.modes}
					setSelectedOptions={(newModes: string[]) => {
						setFilters((prev) => ({ ...prev, modes: newModes }));
					}}
					options={filterOptions.modes.map((mode) => {
						return {
							label: mode,
							value: mode,
						};
					})}
				/>
			</div>
			<div className="pb-3 mb-2 border-b border-white">
				<MultiSelect
					label="Genres"
					placeholder={
						filters.genres.length
							? filters.genres.join(", ")
							: "Select Genres..."
					}
					selectedOptions={filters.genres}
					setSelectedOptions={(newGenres: string[]) => {
						setFilters((prev) => ({ ...prev, genres: newGenres }));
					}}
					options={filterOptions.genres.map((genre) => {
						return {
							label: genre,
							value: genre,
						};
					})}
				/>
			</div>
			<div className="pb-3 mb-2 border-b border-white">
				<MultiSelect
					label="Platforms"
					placeholder={
						filters.platforms.length
							? filters.platforms.join(", ")
							: "Select Platforms..."
					}
					selectedOptions={filters.platforms}
					setSelectedOptions={(newPlatforms: string[]) => {
						setFilters((prev) => ({
							...prev,
							platforms: newPlatforms,
						}));
					}}
					options={filterOptions.platforms.map((platform) => ({
						label: platform,
						value: platform,
					}))}
				/>
			</div>
			<div className="pb-3 mb-2 border-b border-white">
				<MultiSelect
					label="Developers"
					placeholder={
						filters.developers.length
							? filters.developers.join(", ")
							: "Select Developers..."
					}
					selectedOptions={filters.developers}
					setSelectedOptions={(newDevelopers: string[]) => {
						setFilters((prev) => ({
							...prev,
							developers: newDevelopers,
						}));
					}}
					options={filterOptions.developers.map((dev) => ({
						label: dev,
						value: dev,
					}))}
				/>
			</div>
			<div className="pb-3 mb-2 border-b border-white">
				<MultiSelect
					label="Publishers"
					placeholder={
						filters.publishers.length
							? filters.publishers.join(", ")
							: "Select Publishers..."
					}
					selectedOptions={filters.publishers}
					setSelectedOptions={(newPublishers: string[]) => {
						setFilters((prev) => ({
							...prev,
							publishers: newPublishers,
						}));
					}}
					options={filterOptions.publishers.map((publisher) => ({
						label: publisher,
						value: publisher,
					}))}
				/>
			</div>
			<button
				onClick={onFiltersSubmit}
				className="rounded-lg mt-3 px-6 py-3 bg-gradient-to-r from-[#5539cc] from-15% to-[#0066cd] backdrop-opacity-50 hover:brightness-110"
			>
				Apply filters
			</button>
		</form>
	);
};
