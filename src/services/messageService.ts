import { IMessage } from "@/interfaces/message";
import { API } from "@/utilities/constants";

export const fetchUserMessages = async (): Promise<IMessage[]> => {
	const response = await fetch(`${API}/messages/recipient`, {
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Failed to fetch user messages");
	}

	return response.json();
};

export const fetchUserSentMessages = async (): Promise<IMessage[]> => {
	const response = await fetch(`${API}/messages/sender`, {
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Failed to fetch user messages");
	}

	return response.json();
};
