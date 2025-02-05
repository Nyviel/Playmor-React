import { IComment } from "@/interfaces/comment";
import { fetchCommentsByReplyId } from "@/services/commentService";
import { ChevronDownIcon, ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { CommentSection } from "./CommentSection";
import { cn } from "@/lib/utils";
import { CommentCreate } from "./CommentCreate";
import DefaultAvatar from "@/assets/images/resultsnotfound.webp";

export const Comment = ({ comment }: { comment: IComment }) => {
	const [replies, setReplies] = useState<IComment[]>([]);
	const [score, setScore] = useState(0);
	const [replyToggled, setReplyToggled] = useState(false);
	const [toggleReplies, setToggleReplies] = useState(false);

	useEffect(() => {
		if (!comment) return;
		setScore(comment.score);
		const fetchReplies = async () => {
			const res = await fetchCommentsByReplyId(comment.id);
			if (res && res.length) {
				setReplies(res);
			}
		};
		fetchReplies();
	}, [comment]);

	const onLikeClicked = async () => {
		// try {
		// 	const res = await postCommentScore(1, comment.id);
		// 	if (res) {
		// 		setScore((prev) => prev + 1);
		// 	}
		// } catch (error) {
		// 	console.error(error);
		// 	toast.error("Failed to like comment");
		// }
	};

	const onDislikeClicked = async () => {
		// try {
		// 	const res = await postCommentScore(-1, comment.id);
		// 	if (res) {
		// 		setScore((prev) => prev - 1);
		// 	}
		// } catch (error) {
		// 	console.error(error);
		// 	toast.error("Failed to like comment");
		// }
	};

	return (
		<article className="flex gap-4 my-4">
			<div className="w-1/12">
				<img
					src={DefaultAvatar}
					alt="Default user avatar"
					className="w-full aspect-square rounded-full"
				/>
			</div>
			<div className="w-11/12 min-h-1/12 flex flex-col justify-between gap-1">
				<div className="w-full">
					<a href={`/profile/${comment.commenter?.id}`}>
						{comment.commenter?.username}
					</a>{" "}
					({new Date(comment.createdAt).toLocaleDateString()})
				</div>
				<div className="w-full break-words mb-2">
					<p>{comment.content}</p>
				</div>
				<div className="w-full flex gap-8">
					<div className="flex gap-3 items-center justify-center">
						<ThumbsUp onClick={onLikeClicked} /> {score}
						<ThumbsDown onClick={onDislikeClicked} />
					</div>
					<div
						className="text-blue-500 cursor-pointer"
						onClick={() => {
							setReplyToggled((prev) => !prev);
						}}
					>
						Reply
					</div>
				</div>
				<div className={cn(replyToggled ? "block" : "hidden")}>
					<CommentCreate replyId={comment.id} />
				</div>
				<div className="my-1">
					<span
						className={cn(
							replies.length > 0 ? "block" : "hidden",
							"cursor-pointer"
						)}
						onClick={() => {
							setToggleReplies((prev) => !prev);
						}}
					>
						<ChevronDownIcon className="inline me-1" /> Replies (
						{replies.length})
					</span>
					<div
						className={cn(
							toggleReplies ? "block" : "hidden",
							"my-4"
						)}
					>
						<CommentSection
							comments={replies}
							isReplySection={true}
						/>
					</div>
				</div>
			</div>
		</article>
	);
};
