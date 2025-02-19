import {
	Bell,
	LogIn,
	LogOut,
	Mail,
	MenuIcon,
	Pencil,
	Search,
	User,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { PlaymorTitle } from "../utils/PlaymorTitle";
import { useAuth } from "../../hooks/AuthHook";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfileData } from "@/services/userService";
import { IUser } from "@/interfaces/user";
import "./Navigation.css";

export const Navigation = () => {
	const [isAdmin] = useState(false);
	const [isMobileToggled, setIsMobileToggled] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);
	const { logoutUser } = useAuth();

	const { data: user } = useQuery<IUser>({
		queryKey: ["loggedInUser"],
		queryFn: fetchUserProfileData,
	});

	useEffect(() => {
		setLoggedIn(!!user);
	}, [user]);

	useEffect(() => {
		const header = document.querySelector("header");
		if (!header) return;
		const stickyOffset = header.offsetTop;

		window.addEventListener("scroll", () => {
			if (window.scrollY > stickyOffset) {
				header.classList.add("sticky");
			} else {
				header.classList.remove("sticky");
			}
		});

		return window.removeEventListener("scroll", () => {
			if (window.scrollY > stickyOffset) {
				header.classList.add("sticky");
			} else {
				header.classList.remove("sticky");
			}
		});
	}, []);

	const signOut = async () => {
		const res = await logoutUser();
		if (res) {
			setLoggedIn(false);
			window.location.href = "/";
		}
		toast.success("Logged out successfully");
	};

	return (
		<header className="w-full h-fit z-50 flex items-center bg-transparent py-6">
			<a href="/" id="logo">
				<div className="text-3xl">
					<PlaymorTitle />
				</div>
			</a>
			<nav className="relative flex justify-end items-center w-full h-full">
				{!isMobileToggled ? (
					<ul
						role="list"
						className="hidden md:flex md:flex-row items-center justify-end gap-5 text-white"
					>
						<a
							href="/explore"
							title="Explore"
							className="hover:cursor-pointer"
						>
							<Search className="inline ms-1" />
						</a>
						<Separator
							orientation="vertical"
							style={{ height: "20px" }}
						/>
						{isAdmin && (
							<a
								href="/dashboard"
								className="hover:cursor-pointer"
							>
								Dashboard
							</a>
						)}

						{loggedIn ? (
							<>
								<a
									href={`/notifications`}
									className="hover:cursor-pointer"
									title="Notifications"
								>
									<Bell className="inline" />
								</a>
								<Separator
									orientation="vertical"
									style={{ height: "20px" }}
								/>
								<a
									href={`/messages`}
									className="hover:cursor-pointer"
									title="Messages"
								>
									<Mail className="inline" />
								</a>
								<Separator
									orientation="vertical"
									style={{ height: "20px" }}
								/>
								<a
									href={`/profile/${user?.id}`}
									className="hover:cursor-pointer"
									title="Profile"
								>
									<User className="inline" />
								</a>
								<Separator
									orientation="vertical"
									style={{ height: "20px" }}
								/>

								<a
									href="#"
									onClick={signOut}
									title="Logout"
									className="hover:cursor-pointer flex justify-center items-center"
								>
									<LogOut className="inline mt-1" />
								</a>
							</>
						) : (
							<>
								<a
									href="/auth/login"
									className="hover:cursor-pointer"
									title="Login"
								>
									<LogIn className="inline ms-1" />
								</a>
								<Separator
									orientation="vertical"
									style={{ height: "20px" }}
								/>
								<a
									href="/auth/register"
									className="hover:cursor-pointer"
									title="Register"
								>
									<Pencil className="inline ms-1" />
								</a>
							</>
						)}
					</ul>
				) : (
					<ul
						role="list"
						className="absolute bg-[#222] top-10 z-50 flex flex-col items-center justify-start gap-5 p-5 rounded-md text-white"
					>
						<a href="/explore" className="hover:cursor-pointer">
							Explore
							<Search className="inline ms-1" />
						</a>
						<Separator
							orientation="horizontal"
							style={{ height: "1px" }}
						/>
						{isAdmin && (
							<a
								href="/dashboard"
								className="hover:cursor-pointer"
							>
								Dashboard
							</a>
						)}

						{loggedIn ? (
							<>
								<a
									href={`/notifications`}
									className="hover:cursor-pointer"
								>
									Notifications
									<Bell className="inline ms-2" />
								</a>
								<Separator
									orientation="horizontal"
									style={{ height: "1px" }}
								/>
								<a
									href={`/messages`}
									className="hover:cursor-pointer"
								>
									Messages
									<Mail className="inline ms-2" />
								</a>
								<Separator
									orientation="horizontal"
									style={{ height: "1px" }}
								/>
								<a
									href={`/profile/${user?.id}`}
									className="hover:cursor-pointer"
								>
									Profile
									<User className="inline ms-2" />
								</a>
								<Separator
									orientation="horizontal"
									style={{ height: "1px" }}
								/>
								<a
									href="#"
									onClick={signOut}
									className="hover:cursor-pointer flex justify-center items-center"
								>
									Logout
									<LogOut className="inline ms-2 mt-1" />
								</a>
							</>
						) : (
							<>
								<a
									href="/auth/login"
									className="hover:cursor-pointer"
								>
									Login
									<LogIn className="inline ms-1" />
								</a>
								<Separator
									orientation="horizontal"
									style={{ height: "1px" }}
								/>
								<a
									href="/auth/register"
									className="hover:cursor-pointer"
								>
									Register
									<Pencil className="inline ms-1" />
								</a>
							</>
						)}
					</ul>
				)}

				<button
					onClick={() => setIsMobileToggled((prev) => !prev)}
					className="block md:hidden"
				>
					<MenuIcon />
				</button>
			</nav>
		</header>
	);
};
