import { API } from "@/utilities/constants";

export const login = async (
	email: string,
	password: string
): Promise<Response> => {
	const response = await fetch(`${API}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || `Error: ${response.status}`);
	}

	return response.json();
};

export const register = async (
	username: string,
	email: string,
	password: string,
	phoneNumber: string
): Promise<Response> => {
	const response = await fetch(`${API}/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, email, password, phoneNumber }),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || `Error: ${response.status}`);
	}

	return response.json();
};
