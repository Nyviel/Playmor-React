import { login, logout } from "@/services/authService";
import { fetchUserProfileData } from "@/services/userService";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface IAuthContextHook {
	loginUser: CallableFunction;
	logoutUser: CallableFunction;
}

export const AuthContext = createContext<IAuthContextHook>({
	loginUser: () => {},
	logoutUser: () => {},
});
export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		if (!loggedIn) return;

		fetchUserProfileData()
			.then((res) => {
				if (!res) {
					logoutUser(); // Token expired, or server error, logout
				}
			})
			.catch(() => logoutUser());
	}, [loggedIn]);

	const loginUser = async (
		email: string,
		password: string
	): Promise<boolean> => {
		const res = await login(email, password);

		if (res.ok) {
			setLoggedIn(true);
		}

		return res.ok;
	};

	const logoutUser = async (): Promise<boolean> => {
		const res = await logout();

		if (res.ok) {
			setLoggedIn(false);
		}

		return res.ok;
	};

	return (
		<AuthContext.Provider value={{ loginUser, logoutUser }}>
			{children}
		</AuthContext.Provider>
	);
};
