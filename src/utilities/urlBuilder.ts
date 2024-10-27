import { IQueryParams } from "@/components/explore/Explore";

export const urlBuilder = (queryParams: IQueryParams) => {
	const {
		pageNumber,
		sortBy,
		fromDate,
		toDate,
		keyword,
		modes,
		genres,
		platforms,
		developers,
		publishers,
	} = queryParams;

	const queryParamsObject = {
		pageNumber: pageNumber.toString(),
		pageSize: "9",
		sortBy,
		"DateRange.From": fromDate,
		"DateRange.To": toDate,
		Keyword: keyword,
	};

	const multiValueParams = {
		Modes: modes,
		Genres: genres,
		Platforms: platforms,
		Developers: developers,
		Publishers: publishers,
	};

	// Initialize URLSearchParams with single-value params
	const urlParams = new URLSearchParams(
		Object.entries(queryParamsObject).filter(([, value]) => value)
	);

	// Add multi-value params (arrays)
	Object.entries(multiValueParams).forEach(([key, values]) => {
		values.forEach((value) => urlParams.append(key, value));
	});

	return urlParams.toString();
};
