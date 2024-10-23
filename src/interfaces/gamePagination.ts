import { IGame } from "./game";

export interface IGamePagination {
	games: IGame[];
	totalPages: number;
	totalRecords: number;
}
