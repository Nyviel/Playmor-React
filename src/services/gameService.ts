import { IGame } from "@/interfaces/game";
import { API } from "../utilities/constants";
import { IGamePagination } from "@/interfaces/gamePagination";
import { IQueryParams } from "@/components/explore/Explore";
import { urlBuilder } from "@/utilities/urlBuilder";

export const fetchHotPicks = async (): Promise<IGame[]> => {
	const response = await fetch(`${API}/games`);

	if (response.ok) {
		return response.json();
	} else {
		throw new Error(
			"Failed to fetch hot picks" + response.status + response.statusText
		);
	}
};

export const fetchGameById = async (id: number): Promise<IGame> => {
	const response = await fetch(`${API}/games/${id}`);

	if (response.ok) {
		return response.json();
	} else {
		throw new Error(
			"Failed to fetch game" + response.status + response.statusText
		);
	}
};

export const fetchGamesByAddedDate = async (
	sortOrder = "desc"
): Promise<IGame[]> => {
	const response = await fetch(`${API}/games/added?sort=${sortOrder}`);

	if (response.ok) {
		return response.json();
	} else {
		throw new Error(
			"Failed to fetch games" + response.status + response.statusText
		);
	}
};

export const fetchGamesByReleasedDate = async (
	sortOrder = "desc"
): Promise<IGame[]> => {
	const response = await fetch(`${API}/games/released?sort=${sortOrder}`);

	if (response.ok) {
		return response.json();
	} else {
		throw new Error(
			"Failed to fetch games" + response.status + response.statusText
		);
	}
};

export const fetchGamesPaginated = async (
	queryParams: IQueryParams
): Promise<IGamePagination> => {
	const urlParamsString = urlBuilder(queryParams);

	const requestURL = `${API}/games/paginated?${urlParamsString}`;
	const response = await fetch(requestURL);

	if (response.ok) {
		return response.json();
	} else {
		throw new Error(
			"Failed to fetch paginated games" +
				response.status +
				response.statusText
		);
	}
};

export const fetchAvailableModes = async (): Promise<string[]> => {
	const response = await fetch(`${API}/games/available/modes`);

	if (response.ok) {
		return response.json();
	} else {
		throw new Error(
			"Failed to fetch modes" + response.status + response.statusText
		);
	}
};

export const fetchAvailableGenres = async (): Promise<string[]> => {
	const response = await fetch(`${API}/games/available/genres`);

	if (response.ok) {
		return response.json();
	} else {
		throw new Error(
			"Failed to fetch genres" + response.status + response.statusText
		);
	}
};

export const fetchAvailablePlatforms = async (): Promise<string[]> => {
	const response = await fetch(`${API}/games/available/platforms`);

	if (response.ok) {
		return response.json();
	} else {
		throw new Error(
			"Failed to fetch platforms" + response.status + response.statusText
		);
	}
};

export const fetchAvailableDevelopers = async (): Promise<string[]> => {
	const response = await fetch(`${API}/games/available/developers`);

	if (response.ok) {
		return response.json();
	} else {
		throw new Error(
			"Failed to fetch developers" + response.status + response.statusText
		);
	}
};

export const fetchAvailablePublishers = async (): Promise<string[]> => {
	const response = await fetch(`${API}/games/available/publishers`);

	if (response.ok) {
		return response.json();
	} else {
		throw new Error(
			"Failed to fetch publishers" + response.status + response.statusText
		);
	}
};
