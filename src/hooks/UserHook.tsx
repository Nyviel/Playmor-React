import { useContext } from "react";
import {
	IUserContextHook,
	UserContext,
} from "../components/providers/UserProvider";

export const useUser = (): IUserContextHook => useContext(UserContext);
