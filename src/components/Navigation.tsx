import { LogIn, LogOut, Pencil, Search, User } from "lucide-react";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import { PlaymorTitle } from "./utils/PlaymorTitle";
import { useUser } from "../hooks/UserHook";
import { logout } from "@/services/authService";
import { toast } from "react-toastify";

export const Navigation = () => {
	const [isAdmin, setIsAdmin] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const { user, logoutUser } = useUser();
	useEffect(() => {
		setIsAdmin(user?.userRole.toLocaleLowerCase() === "admin");
		setIsAuthenticated(user !== null);
	}, [user]);
	return (
		<header className="w-full flex items-center bg-transparent">
			<a href="/" id="logo">
				<div className="text-3xl">
					<PlaymorTitle />
				</div>
			</a>
			<nav className="relative flex-1">
				<ul
					role="list"
					className="hidden md:flex md:flex-row items-center justify-end gap-5 text-white"
				>
					<a href="/explore" className="hover:cursor-pointer">
						Explore
						<Search className="inline ms-1" />
					</a>
					<Separator
						orientation="vertical"
						style={{ height: "20px" }}
					/>
					{isAdmin && (
						<a href="/dashboard" className="hover:cursor-pointer">
							Dashboard
						</a>
					)}

					{isAuthenticated ? (
						<>
							<a href="/profile" className="hover:cursor-pointer">
								Profile
								<User className="inline ms-2" />
							</a>
							<Separator
								orientation="vertical"
								style={{ height: "20px" }}
							/>
							<a
								href="#"
								onClick={async () => {
									await logout();
									logoutUser();
									setIsAuthenticated(false);
									toast.success("Logged out successfully");
								}}
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
								orientation="vertical"
								style={{ height: "20px" }}
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
			</nav>
		</header>
	);
};
