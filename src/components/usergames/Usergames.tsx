import { DataTable } from "../ui/custom/userGameTableCols";
import { columns } from "./columns";
import { fetchUserGamesByUserIdAsync } from "@/services/userGameService";
import { useParams } from "react-router-dom";
import { fetchUserById } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Spinner } from "../utils/Spinner";

export const Usergames = () => {
	const { userId } = useParams();

	const {
		data: requestedUser,
		error: userError,
		isLoading: isUserLoading,
	} = useQuery({
		queryKey: ["requestedUser", userId],
		queryFn: () => fetchUserById(Number(userId)),
	});

	const {
		data: userGames,
		error: userGamesError,
		isLoading: isUserGamesLoading,
	} = useQuery({
		queryKey: ["userGames", userId],
		queryFn: () => fetchUserGamesByUserIdAsync(Number(userId)),
	});

	if (userError) {
		console.error(userError);
		toast.error("Failed to fetch user data: " + userError.message);
	}

	if (userGamesError) {
		console.error(userGamesError);
		toast.error(
			"Failed to fetch user games data: " + userGamesError.message
		);
	}

	return (
		<section className="min-h-screen">
			{isUserLoading || isUserGamesLoading ? (
				<Spinner color="#5539cc" loading={true} />
			) : (
				<>
					<div className="container mx-auto my-12">
						<h1 className="text-3xl mt-4 font-bold text-white">
							{requestedUser?.username}'s Games
						</h1>
					</div>
					<div className="container mx-auto my-12">
						<DataTable columns={columns} data={userGames ?? []} />
					</div>
				</>
			)}
		</section>
	);
};
