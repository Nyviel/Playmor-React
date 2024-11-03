import { useContext } from "react";
import { IUserContextHook, UserContext } from "../providers/UserProvider";

export const useUser = (): IUserContextHook => useContext(UserContext);
