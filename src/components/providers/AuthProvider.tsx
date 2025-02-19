import { login, logout } from "@/services/authService";
import { createContext, ReactNode } from "react";

export interface IAuthContextHook {
	loginUser: CallableFunction;
	logoutUser: CallableFunction;
}

export const AuthContext = createContext<IAuthContextHook>({
	loginUser: () => {},
	logoutUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const loginUser = async (
		email: string,
		password: string
	): Promise<boolean> => {
		const res = await login(email, password);

		return res.ok;
	};

	const logoutUser = async (): Promise<boolean> => {
		const res = await logout();

		return res.ok;
	};

	return (
		<AuthContext.Provider value={{ loginUser, logoutUser }}>
			{children}
		</AuthContext.Provider>
	);
};
