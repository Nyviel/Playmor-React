import { useEffect, useState } from "react";
import { DataTable } from "../ui/custom/userGameTableCols";
import { columns } from "./columns";
// import { useUser } from "@/hooks/UserHook";
import { fetchUserGamesByUserIdAsync } from "@/services/userGameService";
import { useParams } from "react-router-dom";
import { IUserGame } from "@/interfaces/userGame";
import { IUser } from "@/interfaces/user";
import { fetchUserById } from "@/services/userService";

export const Usergames = () => {
	const [userGames, setUserGames] = useState<IUserGame[]>([]);
	const [requestedUser, setRequestedUser] = useState<IUser>();
	const { userId } = useParams();
	// const { loggedInUser } = useUser();

	useEffect(() => {
		if (!userId) return;

		const fetchUserInfo = async () => {
			const res = await fetchUserById(Number(userId));
			if (res) {
				setRequestedUser(res);
			}
		};
		fetchUserInfo();
	}, [userId]);

	useEffect(() => {
		if (!userId) return;
		const fetchUserGames = async () => {
			const newUserGames = await fetchUserGamesByUserIdAsync(
				Number(userId)
			);

			if (newUserGames.length) {
				setUserGames(newUserGames);
			}
		};

		fetchUserGames();
	}, [userId]);

	return (
		<section>
			<div className="container mx-auto my-12">
				<h1 className="text-3xl mt-4 font-bold text-white">
					{requestedUser?.username}'s Games
				</h1>
			</div>
			<div className="container mx-auto my-12">
				<DataTable columns={columns} data={userGames} />
			</div>
		</section>
	);
};
