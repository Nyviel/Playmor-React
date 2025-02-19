import { IUser } from "./user";

export interface IMessage {
	id: number;
	recipientId: number;
	senderId: number;
	title: string;
	content: string;
	isRead: boolean;
	sender: IUser;
	recipient: IUser;
	createdAt: string;
}
