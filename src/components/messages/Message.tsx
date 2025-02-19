import { getMessageById } from "@/services/messageService";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Reply } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { GradientButton } from "../ui/custom/gradientButton";
import { Separator } from "../ui/separator";
import { Spinner } from "../utils/Spinner";
import ReactTimeAgo from "react-time-ago";
import { toast } from "react-toastify";
import { fetchUserProfileData } from "@/services/userService";
import { useEffect, useState } from "react";
export const Message = () => {
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const {
		data: message,
		isLoading: isLoadingMessage,
		error: errorMessage,
	} = useQuery({
		queryKey: ["message"],
		queryFn: () => getMessageById(Number(id)),
		enabled: !!id,
	});

	const {
		data: user,
		isLoading: isLoadingUser,
		error: errorUser,
	} = useQuery({ queryKey: ["authUser"], queryFn: fetchUserProfileData });

	if (errorMessage || errorUser) {
		toast.error("Failed fetching message by id!");
		console.error(
			`Error fetching message by id: `,
			errorMessage ?? errorUser
		);
	}

	useEffect(() => {
		setIsLoading(isLoadingMessage || isLoadingUser);
	}, [isLoadingMessage, isLoadingUser]);

	return (
		<section className="">
			<a href="/messages" className="text-gray-200">
				<ArrowLeft className="inline me-2" /> Return to messages
			</a>
			{message && !isLoading ? (
				<div className="flex flex-col gap-4 p-8 my-12 bg-black/50 rounded-lg">
					<div className="flex justify-between gap-2">
						<div className="flex gap-2">
							<p className="text-gray-300 font-semibold">
								{message.title}
							</p>
							<a
								href={`/profile/${message.sender.id}`}
								className="text-gray-400 cursor-pointer"
							>
								{message.sender.username} -{" "}
								{message.sender.email}
							</a>
						</div>
						<div className="flex gap-2">
							<p>{new Date(message.createdAt).toDateString()}</p>-
							<ReactTimeAgo
								className="text-gray-400 "
								date={new Date(message.createdAt)}
								locale="en-US"
							/>
						</div>
					</div>
					<div className="text-gray-300">{message?.content}</div>
					<Separator orientation="horizontal" />
					<div className="mt-4">
						<GradientButton
							onClick={() => {
								navigate(
									`/messages/create/${message.sender.id}`
								);
							}}
							className="flex justify-center items-center"
							disabled={message.senderId === user?.id}
						>
							<Reply className="inline me-2" />
							Reply
						</GradientButton>
					</div>
				</div>
			) : (
				<Spinner loading={isLoading} />
			)}
		</section>
	);
};
