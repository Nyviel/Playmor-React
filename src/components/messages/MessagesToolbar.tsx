import { IMessage } from "@/interfaces/message";
import { cn } from "@/lib/utils";
import { patchUserMessages } from "@/services/messageService";
import { Checkbox } from "@radix-ui/react-checkbox";
import {
	ChevronDown,
	MailOpen,
	MailPlus,
	RotateCw,
	Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type MessagesToolbarProps = {
	messages: IMessage[];
	setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
	selectedMessages: Set<number>;
	setSelectedMessages: React.Dispatch<React.SetStateAction<Set<number>>>;
	refetchMessages: CallableFunction;
};

export const MessagesToolbar = ({
	messages,
	setMessages,
	selectedMessages,
	setSelectedMessages,
	refetchMessages,
}: MessagesToolbarProps) => {
	const [allMessagesCheckboxToggle, setAllMessagesCheckboxToggle] =
		useState(false);
	const [isCheckboxDropdownToggled, setIsCheckboxDropdownToggled] =
		useState(false);

	useEffect(() => {
		if (selectedMessages.size == messages.length && messages.length > 0) {
			setAllMessagesCheckboxToggle(true);
		} else {
			setAllMessagesCheckboxToggle(false);
		}
	}, [selectedMessages, messages]);

	const selectAllMessages = () => {
		setSelectedMessages(new Set(messages.map((message) => message.id)));
	};

	const selectAllReadMessages = () => {
		setSelectedMessages(
			new Set(
				messages
					.filter((message) => message.isRead == true)
					.map((message) => message.id)
			)
		);
	};

	const selectAllUnreadMessages = () => {
		setSelectedMessages(
			new Set(
				messages
					.filter((message) => message.isRead == false)
					.map((message) => message.id)
			)
		);
	};
	const updateReadStatusOfSelected = async (readStatus: boolean) => {
		try {
			const messagesPatch = Array.from(selectedMessages).map((id) => {
				return { id, isRead: readStatus };
			});
			const updatedMessages = await patchUserMessages(messagesPatch);

			if (updatedMessages) {
				toast.success("Messages updated successfully");
				setMessages((prev) =>
					prev.map(
						(message) =>
							updatedMessages.find(
								(uMessage) => uMessage.id === message.id
							) ?? message
					)
				);
			}
		} catch (error) {
			console.error(error);
			toast.error("Failed to update messages");
		}
	};

	const deleteSelectedMessages = () => {};

	const refreshMessages = () => {
		refetchMessages();
	};

	return (
		<div className="w-full h-16 flex justify-start items-center border-b border-gray-600">
			<ul className="flex gap-10 p-4 px-8">
				<li
					title="Select all"
					className="relative cursor-pointer flex justify-center items-center "
				>
					<Checkbox
						checked={allMessagesCheckboxToggle}
						onCheckedChange={() => {
							if (!allMessagesCheckboxToggle) {
								selectAllMessages();
							} else {
								setSelectedMessages(new Set());
							}
							setAllMessagesCheckboxToggle((prev) => !prev);
						}}
						className="border border-white h-[24px] w-[24px]"
					/>
					<ChevronDown
						className="scale-75"
						onClick={() =>
							setIsCheckboxDropdownToggled((prev) => !prev)
						}
					/>
					<ul
						className={cn(
							isCheckboxDropdownToggled
								? "flex flex-col"
								: "hidden",
							"gap-2 absolute -top-1/2 bg-gray-900 p-4 -mt-4 translate-y-1/2 rounded-xl"
						)}
					>
						<li onClick={selectAllMessages}>All</li>
						<li onClick={selectAllReadMessages}>Read</li>
						<li onClick={selectAllUnreadMessages}>Unread</li>
					</ul>
				</li>
				<li
					title="Delete selected"
					className="cursor-pointer"
					onClick={deleteSelectedMessages}
				>
					<Trash2 />
				</li>
				<li
					title="Mark selected as read"
					className="cursor-pointer"
					onClick={() => updateReadStatusOfSelected(true)}
				>
					<MailOpen />
				</li>
				<li
					title="Mark selected as unread"
					className="cursor-pointer"
					onClick={() => updateReadStatusOfSelected(false)}
				>
					<MailPlus />
				</li>
				<li
					title="Refresh messages"
					className="cursor-pointer"
					onClick={refreshMessages}
				>
					<RotateCw />
				</li>
			</ul>
		</div>
	);
};
