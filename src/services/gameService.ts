import { IGame } from "@/interfaces/game";
import { API } from "../utilities/constants";

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
