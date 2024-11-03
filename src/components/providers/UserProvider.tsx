import { IUser } from "@/interfaces/user";
import { createContext, ReactNode, useState } from "react";

export interface IUserContextHook {
	user: IUser | null;
	loginUser: CallableFunction;
	logoutUser: CallableFunction;
}

export const UserContext = createContext<IUserContextHook>({
	user: null,
	loginUser: () => {},
	logoutUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<IUser | null>(() => {
		const storedUser = localStorage.getItem("user");
		return storedUser ? JSON.parse(storedUser) : null;
	});

	const loginUser = (userData: IUser) => {
		localStorage.setItem("user", JSON.stringify(userData));
		setUser(userData);
	};

	const logoutUser = () => {
		localStorage.removeItem("user");
		setUser(null);
	};

	return (
		<UserContext.Provider value={{ user, loginUser, logoutUser }}>
			{children}
		</UserContext.Provider>
	);
};
