import { IComment } from "@/interfaces/comment";
import { useEffect, useState } from "react";
import { fetchCommentsByGameId } from "@/services/commentService";
import { toast } from "react-toastify";
import { CommentCreate } from "./CommentCreate";
import { CommentSection } from "./CommentSection";

export const Comments = ({ gameId }: { gameId: number }) => {
	const [comments, setComments] = useState<IComment[]>([]);

	useEffect(() => {
		if (gameId) {
			sessionStorage.setItem("commentGameId", gameId.toString());
		}

		const fetchComments = async () => {
			try {
				const res = await fetchCommentsByGameId(gameId);
				if (res.length) {
					setComments(res);
				}
			} catch (error) {
				console.error(error);
				toast.error("Failed to fetch comments!");
			}
		};
		fetchComments();
	}, [gameId]);

	return (
		<section className="my-6">
			<h2 className="text-lg font-semibold">
				Comments ({comments.length})
			</h2>
			<div>
				<CommentCreate replyId={0} />
			</div>
			<div className="mt-12">
				<CommentSection comments={comments} isReplySection={false} />
			</div>
		</section>
	);
};
