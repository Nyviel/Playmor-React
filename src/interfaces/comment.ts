export interface IComment {
	id: number;
	replyId: number;
	gameId: number;
	commenterId: number;
	content: string;
	createdAt: string;
}
