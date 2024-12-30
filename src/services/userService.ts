import { IUser } from "@/interfaces/user";
import { API } from "@/utilities/constants";

export const fetchUserProfileData = async (): Promise<IUser> => {
	const response = await fetch(`${API}/users/profile`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error(`Error: ${response.status}`);
	}

	return response.json();
};

export const fetchUserById = async (userId: number): Promise<IUser> => {
	const response = await fetch(`${API}/users/${userId}`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error(`Error: ${response.status}`);
	}

	return response.json();
};
