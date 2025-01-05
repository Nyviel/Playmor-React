import { IComment } from "@/interfaces/comment";
import { IUser } from "@/interfaces/user";
import { fetchCommentsByReplyId } from "@/services/commentService";
import { fetchUserById } from "@/services/userService";
import { ChevronDownIcon, ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CommentSection } from "./CommentSection";
import { cn } from "@/lib/utils";
import { CommentCreate } from "./CommentCreate";
import DefaultAvatar from "@/assets/images/resultsnotfound.webp";

export const Comment = ({ comment }: { comment: IComment }) => {
	const [commenter, setCommenter] = useState<IUser>();
	const [replies, setReplies] = useState<IComment[]>([]);
	const [replyToggled, setReplyToggled] = useState(false);
	const [toggleReplies, setToggleReplies] = useState(false);

	useEffect(() => {
		if (!comment) return;
		const fetchCommenter = async () => {
			const res = await fetchUserById(comment.commenterId);
			if (res) {
				setCommenter(res);
			} else {
				toast.error("Failed to fetch comment user information!");
			}
		};

		const fetchReplies = async () => {
			const res = await fetchCommentsByReplyId(comment.id);
			if (res && res.length) {
				setReplies(res);
			}
		};

		Promise.all([fetchCommenter(), fetchReplies()]);
	}, [comment]);

	return (
		<article className="flex gap-4 my-4">
			<div className="w-1/12">
				<img
					src={DefaultAvatar}
					alt="Default user avatar"
					className="w-full aspect-square rounded-full"
				/>
			</div>
			<div className="w-11/12 flex flex-col gap-1">
				<div className="w-full">
					<a href={`/profile/${commenter?.id}`}>
						{commenter?.username}
					</a>{" "}
					({new Date(comment.createdAt).toLocaleDateString()})
				</div>
				<div className="w-full break-words mb-2">
					<p>{comment.content}</p>
				</div>
				<div className="w-full flex gap-8">
					<div className="flex gap-3 items-center justify-center">
						<ThumbsUp /> 0
						<ThumbsDown /> 0
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
				<div className="">
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
