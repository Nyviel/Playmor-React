import defaultUserAvatar from "@/assets/images/resultsnotfound.webp";
import { GradientButton } from "../ui/custom/gradientButton";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { ProfileStatsCard } from "./ProfileStatsCard";
import { CARDS } from "@/utilities/constants";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserGamesStatisticsAsync } from "@/services/userGameService";
import { IUserStatistics } from "@/interfaces/userStatistics";
import { fetchUserById, fetchUserProfileData } from "@/services/userService";
import { IUser } from "@/interfaces/user";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Spinner } from "../utils/Spinner";

const useUserData = (userId: string | undefined) => {
	const authUserQuery = useQuery<IUser>({
		queryKey: ["authUser"],
		queryFn: fetchUserProfileData,
	});

	const userProfileQuery = useQuery<IUser>({
		queryKey: ["userProfile", userId],
		queryFn: () => fetchUserById(Number(userId)),
		enabled: !!userId,
	});

	const userStatsQuery = useQuery<IUserStatistics>({
		queryKey: ["userStatistics", userId],
		queryFn: () => fetchUserGamesStatisticsAsync(Number(userId)),
		enabled: !!userId,
	});

	return {
		authUser: authUserQuery,
		userProfile: userProfileQuery,
		userStats: userStatsQuery,
	};
};

export const Profile = () => {
	const { userId } = useParams();
	const navigate = useNavigate();

	const {
		authUser: {
			data: authUser,
			error: authUserError,
			isError: isAuthUserError,
		},
		userProfile: {
			data: user,
			isLoading: userLoading,
			error: userError,
			isError: isUserError,
		},
		userStats: {
			data: statistics,
			isLoading: statsLoading,
			error: statsError,
			isError: isStatsError,
		},
	} = useUserData(userId);

	useEffect(() => {
		if (isAuthUserError) {
			toast.error(
				"Error fetching authorized user. If you're logged in, try relogging or waiting a few minutes."
			);
			console.error(
				`Error querying authUser: ${authUserError?.name} ${authUserError?.message}`
			);
		}
		if (isUserError) {
			toast.error("Failed to load user data.");
			console.error(
				`Error querying user: ${userError?.name} ${userError?.message}`
			);
		}
		if (isStatsError) {
			toast.error("Failed to load user statistics.");
			console.error(
				`Error querying statistics: ${statsError?.name} ${statsError?.message}`
			);
		}
	}, [
		isAuthUserError,
		authUserError,
		isUserError,
		userError,
		isStatsError,
		statsError,
	]);

	return (
		<section className="w-full bg-black/25 flex flex-col my-12 rounded-lg">
			{userLoading ? (
				<Spinner loading={userLoading} />
			) : (
				<div className="flex flex-col h-fit pb-4 px-4">
					<div className="my-4 bg-gradient-to-r pb-1 from-[#5539cc] from-15% to-[#0066cd]">
						<div className="bg-black/75 p-4">
							<h1 className="text-xl font-semibold">
								{user?.username}
							</h1>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 text-center gap-5">
						<img
							className="mx-auto w-64 aspect-square rounded-sm border-2 border-[#5539cc]"
							src={defaultUserAvatar}
							alt=""
						/>
						<div className="px-4">
							<h3 className="text-lg font-bold">About me</h3>
							<p>
								Lorem ipsum, dolor sit amet consectetur
								adipisicing elit. Reiciendis temporibus sapiente
								odit asperiores enim at modi voluptas officia?
							</p>
						</div>
						<div className="px-4">
							<h3 className="text-lg font-bold">
								Account created
							</h3>
							<p>
								{new Date(user?.createdAt || "").toDateString()}
							</p>
						</div>
						<div className="px-4">
							<h3 className="text-lg font-bold">Account role</h3>
							<p>{user?.userRole}</p>
						</div>
						<div className="col-span-1 md:col-span-2 xl:col-span-1 flex flex-col gap-4">
							<Button
								disabled={user?.id == authUser?.id || !authUser}
								className="bg-red-700"
							>
								Report user
							</Button>
							<Button
								disabled={user?.id == authUser?.id || !authUser}
								className="bg-violet-600"
								onClick={() =>
									navigate(`/messages/create/${user?.id}`)
								}
							>
								Send a message
							</Button>
							<Button
								disabled={user?.id == authUser?.id || !authUser}
								className="bg-green-700"
							>
								Send friend request
							</Button>
							<GradientButton
								onClick={() => {
									navigate(`/usergames/${user?.id}`);
								}}
								className="py-2 font-light"
							>
								Games list
							</GradientButton>
						</div>
					</div>
				</div>
			)}
			<div className="flex-grow flex flex-col px-4">
				<div className="my-4 bg-black/25 p-4">
					<h1 className="text-xl font-semibold">
						{user?.username}'s statistics
					</h1>
				</div>
				{statsLoading ? (
					<Spinner loading={statsLoading} />
				) : (
					<ul className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8 py-8">
						{statistics &&
							CARDS.map((card, i) => (
								<ProfileStatsCard
									key={card.title + card.value.toString()}
									title={card.title}
									value={Object.values(statistics)[i]}
								/>
							))}
					</ul>
				)}
			</div>
		</section>
	);
};
