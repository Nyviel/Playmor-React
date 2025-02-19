import { IMessage } from "@/interfaces/message";
import { IMessagePatch } from "@/interfaces/messagePatch";
import { IMessagePost } from "@/interfaces/messagePost";
import { API } from "@/utilities/constants";

export const fetchMessagesAsRecipient = async (): Promise<IMessage[]> => {
	const response = await fetch(`${API}/messages/recipient`, {
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Failed to fetch user messages");
	}

	return response.json();
};

export const fetchMessagesAsSender = async (): Promise<IMessage[]> => {
	const response = await fetch(`${API}/messages/sender`, {
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Failed to fetch user messages");
	}

	return response.json();
};

export const getMessageById = async (id: number): Promise<IMessage> => {
	const response = await fetch(`${API}/messages/${id}`, {
		credentials: "include",
	});

	if (!response.ok) {
		const data = await response.text();
		throw new Error("Failed fetching message by id, error: " + data);
	}

	return response.json();
};

export const postUserMessage = async (
	message: IMessagePost
): Promise<IMessage> => {
	const response = await fetch(`${API}/messages`, {
		body: JSON.stringify(message),
		credentials: "include",
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(`Failed to post user message: ${error}`);
	}

	return response.json();
};

//isRead toggle
export const patchUserMessage = async (
	message: IMessagePatch
): Promise<IMessage> => {
	const response = await fetch(`${API}/messages/${message.id}`, {
		body: JSON.stringify(message),
		credentials: "include",
		method: "PATCH",
		headers: {
			"content-type": "application/json",
		},
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(`Failed to patch user message: ${error}`);
	}

	return response.json();
};

export const patchUserMessages = async (
	messages: IMessagePatch[]
): Promise<IMessage[]> => {
	const response = await fetch(`${API}/messages`, {
		body: JSON.stringify(messages),
		credentials: "include",
		method: "PATCH",
		headers: {
			"content-type": "application/json",
		},
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(`Failed to patch user messages: ${error}`);
	}

	return response.json();
};
