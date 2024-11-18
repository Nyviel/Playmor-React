import { FormEvent, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { PlaymorTitle } from "../utils/PlaymorTitle";
import { GradientButton } from "../ui/custom/gradientButton";
import { GradientCard } from "../ui/custom/gradientCard";
import { toast } from "react-toastify";
import { login, logout } from "@/services/authService";
import { Input } from "../ui/custom/input";
import { fetchUserProfileData } from "@/services/userService";
import { useUser } from "../../hooks/UserHook";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string>("");
	const { loginUser } = useUser();

	const navigate = useNavigate();

	const handleFormSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			await login(email, password);
			const userData = await fetchUserProfileData();
			if (userData) {
				toast.success("Logged in successfully");
				loginUser(userData);
				navigate("/");
			} else {
				toast.error("Failed to login");
				await logout();
			}
		} catch (err) {
			toast.error(`Failed to login`);
			let message = err as string;
			if (err instanceof Error) {
				message = err.message;
			}
			setError(message);
		}
	};

	return (
		<section className="min-h-screen w-full flex justify-center items-start mt-24">
			<GradientCard
				parentStyle="w-full md:w-3/4 lg:w-1/2 h-fit flex justify-center items-start"
				gradientStyle="opacity-75"
				contentStyle="w-full h-full"
			>
				<form
					onSubmit={(e) => {
						handleFormSubmit(e);
					}}
					className="w-full p-6 h-fit space-y-8"
				>
					<h2 className="text-3xl text-center font-semibold mb-6 text-white">
						Login to <PlaymorTitle />
					</h2>
					<hr />
					<div className="my-6 font-semibold text-center text-white">
						Log in with your email address
					</div>

					<div className="mb-4 space-y-4">
						<Input
							inputType="email"
							name="Email"
							placeholder="Enter your email address..."
							value={email}
							setValue={(val: string) => {
								setEmail(val);
							}}
						/>

						<Input
							inputType="password"
							name="Password"
							placeholder="Enter your password..."
							value={password}
							setValue={(val: string) => {
								setPassword(val);
							}}
						/>
					</div>

					<div className="my-1">
						{error && (
							<p className="text-red-400 text-base font-medium">
								{"Error: " + error}
							</p>
						)}
					</div>

					<div className="flex flex-col justify-center items-center">
						<GradientButton
							className="font-bold mb-2 w-full focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Submit
						</GradientButton>
						<Link
							to="/auth/register"
							className="text-white p-1 flex items-center underline font-light hover:text-primary-950"
						>
							Not a member yet? Register with us here!
							<FaArrowRight className="inline-block ml-2" />
						</Link>
					</div>
				</form>
			</GradientCard>
		</section>
	);
};
