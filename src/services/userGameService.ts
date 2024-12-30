import { IUserGame } from "@/interfaces/userGame";
import { IUserGamePost } from "@/interfaces/userGamePost";
import { IUserStatistics } from "@/interfaces/userStatistics";
import { API } from "@/utilities/constants";

export const fetchUserGamesByUserIdAsync = async (
	userId: number
): Promise<IUserGame[]> => {
	const response = await fetch(`${API}/userGames/byUser/${userId}`);

	if (!response.ok) {
		console.error("Encountered error when fetching userGames by userId");
		throw new Error(
			"Error encountered in fetchUserGamesByUserIdAsync: " +
				response.status
		);
	}

	return await response.json();
};

export const postUserGameAsync = async (
	userGame: IUserGamePost
): Promise<IUserGame> => {
	const response = await fetch(`${API}/userGames`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify(userGame),
		headers: {
			"Content-type": "application/json",
		},
	});

	if (!response.ok) {
		console.error("Encountered error when adding userGame");
		throw new Error(
			"Error encountered in postUserGameAsync: " + response.status
		);
	}

	return await response.json();
};

export const deleteUserGameAsync = async (
	userGameId: number
): Promise<boolean> => {
	const response = await fetch(`${API}/userGames/${userGameId}`, {
		method: "DELETE",
		credentials: "include",
	});

	if (!response.ok) {
		console.error(
			`Encountered an error when deleting userGame of id: ${userGameId}`
		);
		throw new Error(
			`${response.status} Error encountered in deleteUserGameAsync`
		);
	}

	return response.json();
};

export const fetchUserGamesStatisticsAsync = async (
	userId: number
): Promise<IUserStatistics> => {
	const response = await fetch(`${API}/userGames/statistics/${userId}`);

	if (!response.ok) {
		console.error(
			`Encountered an error when fetching userGame statistics of user: ${userId}`
		);
		throw new Error(
			`${response.status} Error encountered in fetchUserGamesStatisticsAsync`
		);
	}

	return response.json();
};

export const fetchUserGameTrackedStatus = async (
	userId: number,
	gameId: number
): Promise<IUserGame> => {
	const response = await fetch(`${API}/userGames/${userId}/tracks/${gameId}`);

	if (!response.ok) {
		console.error(
			`Encountered an error when fetching userGame statistics of user: ${userId}`
		);
		throw new Error(
			`${response.status} Error encountered in fetchUserGamesStatisticsAsync`
		);
	}

	return response.json();
};
