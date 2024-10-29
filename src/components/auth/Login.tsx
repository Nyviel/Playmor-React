import { FormEvent, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PlaymorTitle } from "../utils/PlaymorTitle";
import { GradientButton } from "../ui/custom/gradientButton";
import { GradientCard } from "../ui/custom/gradientCard";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleFormSubmit = async (e: FormEvent) => {
		e.preventDefault();
	};

	return (
		<section className="min-h-screen w-full flex justify-center items-start mt-36">
			<GradientCard
				parentStyle="w-1/2 h-fit flex justify-center items-start"
				gradientStyle="opacity-75"
				contentStyle="w-full h-full"
			>
				<form
					onSubmit={(e) => {
						handleFormSubmit(e);
					}}
					className="w-full p-6 h-fit space-y-8 bg-black rounded-lg"
				>
					<h2 className="text-3xl text-center font-semibold mb-6 text-white">
						Login to <PlaymorTitle />
					</h2>
					<hr />
					<div className="my-6 font-semibold text-center text-white">
						Log in with your email address
					</div>

					<div className="mb-4 space-y-4">
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Email address..."
							required
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							className="w-full p-2 px-4 rounded-md"
						/>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Password..."
							required
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							className="w-full p-2 px-4 rounded-md"
						/>
					</div>

					<div className="my-1">
						{error && (
							<p className="text-red-300 text-base font-medium">
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
