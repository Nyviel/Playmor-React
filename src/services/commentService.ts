import { IComment } from "@/interfaces/comment";
import { ICommentPost } from "@/interfaces/commentPost";
import { API } from "@/utilities/constants";

export const fetchCommentsByGameId = async (
	gameId: number
): Promise<IComment[]> => {
	const res = await fetch(`${API}/comments/game/${gameId}`);

	if (res.ok) {
		return res.json();
	} else {
		throw new Error(
			`Failed to fetch comments by game id, gameId: ${gameId}`
		);
	}
};

export const fetchCommentsByReplyId = async (
	commentId: number
): Promise<IComment[]> => {
	const res = await fetch(`${API}/comments/replies/${commentId}`);

	if (res.ok) {
		return res.json();
	} else {
		throw new Error(
			`Failed to fetch replies by comment id, commentId: ${commentId}`
		);
	}
};

export const PostComment = async (
	commentPost: ICommentPost
): Promise<IComment> => {
	const res = await fetch(`${API}/comments`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify(commentPost),
		headers: {
			"Content-type": "application/json",
		},
	});

	if (res.ok) {
		return res.json();
	} else {
		throw new Error(`Failed to post a comment: ${commentPost}`);
	}
};
