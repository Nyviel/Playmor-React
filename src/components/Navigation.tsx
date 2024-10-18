import { LogIn, LogOut, Pencil, Search } from "lucide-react";
import { Separator } from "./ui/separator";
import { useState } from "react";

export const Navigation = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	return (
		<header className="w-full flex items-center bg-transparent">
			<a href="/" id="logo">
				<div className="text-3xl">
					<span className="text-violet-500 font-bold">Play</span>
					<span className="text-white">Mor</span>
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
						<div>
							<a
								href="/dashboard"
								className="hover:cursor-pointer"
							>
								Dashboard
							</a>
						</div>
					)}

					{isAuthenticated ? (
						<div>
							<a href="/profile" className="hover:cursor-pointer">
								Profile
							</a>
							<a
								href="#"
								onClick={() => {
									setIsAuthenticated(false);
									// signOut();
								}}
								className="hover:cursor-pointer"
							>
								Logout
								<LogOut className="inline ms-1" />
							</a>
						</div>
					) : (
						<div className="flex gap-5 justify-center items-center">
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
						</div>
					)}
				</ul>
			</nav>
		</header>
	);
};
