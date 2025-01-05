import { IComment } from "@/interfaces/comment";
import { Comment } from "./Comment";

export const CommentSection = ({
	comments,
	isReplySection,
}: {
	comments: IComment[];
	isReplySection: boolean;
}) => {
	return (
		<div>
			{comments.map((comment) => {
				if (!isReplySection && comment.replyId != 0) return;

				return <Comment comment={comment} />;
			})}
			{comments.length == 0 && (
				<h3 className="text-lg">No comments yet...</h3>
			)}
		</div>
	);
};
