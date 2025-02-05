import { IUser } from "./user";

export interface IComment {
	id: number;
	replyId: number;
	gameId: number;
	commenterId: number;
	score: number;
	content: string;
	commenter: IUser;
	createdAt: string;
}
