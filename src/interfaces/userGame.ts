import { IGame } from "./game";
import { IUser } from "./user";

export interface IUserGame {
	id: number;
	gameId: number;
	userId: number;
	score: number;
	status: string;
	game: IGame;
	user: IUser;
	createdAt: string;
}
