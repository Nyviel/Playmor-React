import { IMessage } from "@/interfaces/message";
import {
	fetchMessagesAsRecipient,
	fetchMessagesAsSender,
} from "@/services/messageService";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../utils/Spinner";
import { toast } from "react-toastify";
import { MessageCard } from "./MessageCard";

import { Inbox, SendHorizontal } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MessagesToolbar } from "./MessagesToolbar";

type MessageType = "recipient" | "sender";
interface ISidebar {
	title: string;
	value?: MessageType;
	icon: ReactNode;
}

const sidebarItems: ISidebar[] = [
	{
		title: "Inbox",
		value: "recipient",
		icon: <Inbox />,
	},
	{
		title: "Sent",
		value: "sender",
		icon: <SendHorizontal />,
	},
];

export const Messages = () => {
	const [selectedMessages, setSelectedMessages] = useState<Set<number>>(
		new Set()
	);
	const [isLoading, setIsLoading] = useState(true);
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [currentMessageType, setCurrentMessageType] =
		useState<MessageType>("recipient");

	const {
		data: recipientMessages,
		isLoading: isLoadingRecipient,
		isFetching: isFetchingRecipient,
		error: errorRecipient,
		refetch: refetchRecipientMessages,
	} = useQuery<IMessage[]>({
		queryKey: ["recipientMessages"],
		queryFn: fetchMessagesAsRecipient,
		enabled: currentMessageType == "recipient",
	});

	const {
		data: senderMessages,
		isLoading: isLoadingSender,
		isFetching: isFetchingSender,
		error: errorSender,
		refetch: refetchSenderMessages,
	} = useQuery<IMessage[]>({
		queryKey: ["senderMessages"],
		queryFn: fetchMessagesAsSender,
		enabled: currentMessageType == "sender",
	});

	useEffect(() => {
		setIsLoading(
			isLoadingRecipient ||
				isLoadingSender ||
				isFetchingRecipient ||
				isFetchingSender
		);
	}, [
		isLoadingRecipient,
		isLoadingSender,
		isFetchingRecipient,
		isFetchingSender,
	]);

	useEffect(() => {
		if (errorRecipient || errorSender) {
			toast.error("Failed fetching user messages!");
			console.error(
				`Error: ${errorRecipient?.name || errorSender?.name} | ${
					errorRecipient?.message || errorSender?.message
				}`
			);
		}
	}, [errorRecipient, errorSender]);

	useEffect(() => {
		if (currentMessageType == "recipient" && recipientMessages) {
			setMessages(recipientMessages);
		}

		if (currentMessageType == "sender" && senderMessages) {
			setMessages(senderMessages);
		}
	}, [currentMessageType, recipientMessages, senderMessages]);

	const handleSidebarClick = (value?: MessageType) => {
		if (value && value !== currentMessageType) {
			setCurrentMessageType(value);
		}
	};

	const toggleSelection = (id: number) => {
		setSelectedMessages((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(id)) {
				newSet.delete(id);
			} else {
				newSet.add(id);
			}
			return newSet;
		});
	};

	return (
		<section className="w-full h-[600px] bg-black/25 flex my-12 rounded-xl">
			<aside className="w-1/6 flex-grow flex flex-col gap-4 p-4 bg-black/30 rounded-xl border-r border-r-gray-800">
				<h2 className="text-gray-400 font-semibold">Messages</h2>
				{sidebarItems.map((item) => {
					return (
						<div
							onClick={() => handleSidebarClick(item.value)}
							key={Math.random()}
							className={cn(
								currentMessageType === item.value &&
									"bg-gray-500",
								"flex gap-5 p-2 rounded-md text-gray-300 hover:text-gray-200 hover:bg-black/50"
							)}
						>
							<span className="text-gray-300">{item.icon}</span>
							{item.title}
						</div>
					);
				})}
			</aside>
			<div className="w-5/6 flex-grow flex flex-col bg-black/30 rounded-xl">
				{isLoading ? (
					<Spinner loading={isLoadingRecipient || isLoadingSender} />
				) : (
					<>
						<MessagesToolbar
							messages={messages}
							setMessages={setMessages}
							selectedMessages={selectedMessages}
							setSelectedMessages={setSelectedMessages}
							refetchMessages={
								currentMessageType == "recipient"
									? refetchRecipientMessages
									: refetchSenderMessages
							}
						/>

						{messages?.length == 0 ? (
							<div className="w-full flex-grow flex  justify-center items-center">
								<h2 className="text-lg font-semibold text-gray-400">
									No messages found...
								</h2>
							</div>
						) : (
							<div className="overflow-y-auto w-full flex-grow">
								{messages?.map((message) => (
									<MessageCard
										key={Math.random()}
										message={message}
										isSelected={selectedMessages.has(
											message.id
										)}
										toggleSelection={toggleSelection}
									/>
								))}
							</div>
						)}
					</>
				)}
			</div>
		</section>
	);
};
