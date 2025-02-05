import { useContext } from "react";
import {
	IAuthContextHook,
	AuthContext,
} from "../components/providers/AuthProvider";

export const useAuth = (): IAuthContextHook => useContext(AuthContext);
