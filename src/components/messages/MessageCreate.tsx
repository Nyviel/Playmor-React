import { FormEvent, useRef, useState } from "react";
import { GradientCard } from "../ui/custom/gradientCard";
import { Textarea } from "../ui/textarea";
import { GradientButton } from "../ui/custom/gradientButton";
import {
	MESSAGE_CONTENT_MAX_LENGTH,
	MESSAGE_CONTENT_MIN_LENGTH,
	MESSAGE_TITLE_MAX_LENGTH,
	MESSAGE_TITLE_MIN_LENGTH,
} from "@/utilities/constants";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";
import { postUserMessage } from "@/services/messageService";
import { useParams } from "react-router-dom";
import { fetchUserById, fetchUserProfileData } from "@/services/userService";
import { Input } from "../ui/input";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "@/interfaces/user";
import { Spinner } from "../utils/Spinner";

export const MessageCreate = () => {
	const contentRef = useRef<HTMLTextAreaElement>(null);
	const titleRef = useRef<HTMLInputElement>(null);
	const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
	const [error, setError] = useState("");
	const { recipientId } = useParams();

	const {
		data: sender,
		isLoading: isLoadingSender,
		error: senderError,
	} = useQuery<IUser>({
		queryKey: ["sender"],
		queryFn: fetchUserProfileData,
	});

	const {
		data: recipient,
		isLoading: isLoadingRecipient,
		error: recipientError,
	} = useQuery<IUser>({
		queryKey: ["recipient"],
		queryFn: () => fetchUserById(Number(recipientId)),
		enabled: !!recipientId,
	});

	if (senderError) {
		console.error(
			`Error occured when querying sender: ${senderError.name} | ${senderError.message}`
		);
		toast.error(
			"Failed fetching authorized user information. Try again later or login again."
		);
	}

	if (recipientError) {
		console.error(
			`Error occured when querying recipient: ${recipientError.name} | ${recipientError.message}`
		);
		toast.error("Failed fetching recipient information. Try again later.");
	}

	const handleFormSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!recipientId || !sender) {
			toast.error(
				"Message could not be sent, recipient or sender information is missing."
			);
			return;
		}

		if (contentRef.current && titleRef.current) {
			setIsSubmitDisabled(true);

			const rawTitle = titleRef.current.value.toString();
			const rawContent = contentRef.current.value.toString();

			const parsedTitle = DOMPurify.sanitize(
				rawTitle.trim().slice(0, 100)
			);
			const parsedContent = DOMPurify.sanitize(
				rawContent.trim().slice(0, 2000)
			);

			try {
				const res = await postUserMessage({
					recipientId: Number(recipientId),
					senderId: sender.id,
					title: parsedTitle,
					content: parsedContent,
				});

				if (res) {
					toast.success("Message sent successfully!");
					contentRef.current.value = "";
					titleRef.current.value = "";
				}
			} catch (err) {
				console.error(`Failed to submit a message: ${err}`);
				setError("Message could not be sent: " + err);
			} finally {
				setIsSubmitDisabled(false);
			}
		}
	};

	return (
		<section className="min-h-screen w-full flex justify-center items-start mt-24">
			<GradientCard
				parentStyle="w-full md:w-3/4 lg:w-1/2 h-fit flex justify-center items-start"
				gradientStyle="opacity-75"
				contentStyle="w-full h-full"
			>
				{isLoadingSender || isLoadingRecipient ? (
					<Spinner loading={isLoadingSender || isLoadingRecipient} />
				) : (
					<form
						onSubmit={(e) => {
							handleFormSubmit(e);
						}}
						className="w-full p-6 h-fit space-y-8"
					>
						<h2 className="text-3xl text-center font-semibold mb-6 text-white">
							Message creator
						</h2>

						<hr />
						<div className="font-semibold text-white">
							Recipient:{" "}
							<a
								className="font-normal text-blue-400"
								href={`/profile/${recipientId}`}
							>
								{recipient?.username}
							</a>
						</div>
						<div className="mb-4 space-y-4">
							<Input
								ref={titleRef}
								name="title"
								placeholder="Title of this message..."
								maxLength={MESSAGE_TITLE_MAX_LENGTH}
								minLength={MESSAGE_TITLE_MIN_LENGTH}
								className="bg-gray-800 text-gray-100"
							/>

							<Textarea
								ref={contentRef}
								name="content"
								placeholder="Start typing your message..."
								rows={20}
								maxLength={MESSAGE_CONTENT_MAX_LENGTH}
								minLength={MESSAGE_CONTENT_MIN_LENGTH}
								className="bg-gray-800 text-gray-100"
							/>
						</div>

						<div className="my-1">
							{error && (
								<p className="text-red-400 text-base font-medium">
									{"Error: " + error}
								</p>
							)}
						</div>

						<div className="flex flex-col justify-center items-center">
							<GradientButton
								className="font-bold mb-2 w-full focus:outline-none focus:shadow-outline"
								type="submit"
								disabled={isSubmitDisabled}
							>
								Submit
							</GradientButton>
						</div>
					</form>
				)}
			</GradientCard>
		</section>
	);
};
