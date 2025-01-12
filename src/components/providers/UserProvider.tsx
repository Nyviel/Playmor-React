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
		let parsedUser = null;
		if (storedUser) parsedUser = JSON.parse(storedUser);
		console.log(storedUser, parsedUser);
		if (parsedUser) {
			const currentTime = new Date().getTime();

			if (currentTime > parsedUser.expires) {
				localStorage.removeItem("user");
				return null;
			}
			return parsedUser.userData;
		}
		return null;
	});

	const loginUser = (userData: IUser) => {
		localStorage.setItem(
			"user",
			JSON.stringify({
				userData,
				expires: new Date().getTime() + 1000 * 60 * 60 * 23, // 23h
			})
		);
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
