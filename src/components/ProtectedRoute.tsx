import { fetchUserProfileData } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "./utils/Spinner";

export const ProtectedRoute = () => {
	const {
		data: user,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["authUser"],
		queryFn: fetchUserProfileData,
		retry: false,
	});

	if (isLoading) {
		return <Spinner loading={isLoading} />;
	}

	if (!user || isError) {
		return <Navigate to="/auth/login" replace />;
	}

	return <Outlet />;
};
