import { useUser } from "@/hooks/UserHook";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import DefaultAvatar from "@/assets/images/resultsnotfound.webp";
import { useRef } from "react";
import { PostComment } from "@/services/commentService";
import { toast } from "react-toastify";

export const CommentCreate = ({ replyId }: { replyId: number }) => {
	const { user } = useUser();
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	if (!user) {
		return (
			<div className="my-6">
				<h3>
					To post a comment,{" "}
					<a className="text-blue-500" href="/auth/login">
						log in
					</a>{" "}
					or{" "}
					<a className="text-blue-500" href="/auth/register">
						create an account
					</a>
				</h3>
			</div>
		);
	}

	const onCommentCancel = async () => {
		if (textareaRef.current) {
			textareaRef.current.value = "";
		}
	};

	const onCommentSubmit = async () => {
		if (textareaRef.current) {
			const raw = textareaRef.current.value.toString();
			const cleaned = raw.trim().slice(0, 500);
			const gameId = sessionStorage.getItem("commentGameId");
			try {
				const res = await PostComment({
					gameId: gameId ? Number(gameId) : 0,
					replyId,
					commenterId: user.id,
					content: cleaned,
				});

				if (res) {
					toast.success(
						"Successfully added a comment, you might need to refresh the page."
					);
				}
			} catch (error) {
				console.error(`Failed to post comment: ${error}`);
				toast.error("Failed to add a comment!");
			} finally {
				textareaRef.current.value = "";
			}
		}
	};

	return (
		<section className="w-full flex gap-4 my-6">
			<div className="w-1/12">
				<img
					src={DefaultAvatar}
					alt="Default user avatar"
					className="w-full aspect-square rounded-full"
				/>
			</div>
			<div className="w-11/12">
				<div className="w-full mb-4">
					<Textarea
						ref={textareaRef}
						minLength={1}
						maxLength={500}
						placeholder="Add a comment..."
						className="bg-transparent"
					/>
				</div>
				<div className="w-full flex justify-end gap-4">
					<Button onClick={onCommentCancel}>Cancel</Button>
					<Button onClick={onCommentSubmit}>Submit</Button>
				</div>
			</div>
		</section>
	);
};
