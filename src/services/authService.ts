import { API } from "@/utilities/constants";

export const login = async (
	email: string,
	password: string
): Promise<Response> => {
	const response = await fetch(`${API}/auth/login`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || `Error: ${response.status}`);
	}

	return response;
};

export const logout = async (): Promise<Response> => {
	const response = await fetch(`${API}/auth/logout`, {
		method: "GET",
		credentials: "include",
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
	password: string
): Promise<Response> => {
	const response = await fetch(`${API}/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, email, password }),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || `Error: ${response.status}`);
	}

	return response.json();
};
