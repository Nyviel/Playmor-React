import { API } from "../utilities/constants";

export const fetchHotPicks = async (): Promise<Response> => {
	return fetch(`${API}/games`);
};

export const fetchGameById = async (gameId: number): Promise<Response> => {
	return fetch(`${API}/games/${gameId}`);
};
