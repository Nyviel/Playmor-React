import { IUserRegisterFields } from "@/interfaces/userRegisterFields";
import { FormEvent, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GradientButton } from "../ui/custom/gradientButton";
import { GradientCard } from "../ui/custom/gradientCard";
export const Register = () => {
	const [fields, setFields] = useState<IUserRegisterFields>({
		name: "",
		email: "",
		password: "",
		repeatPassword: "",
	});

	const [error] = useState("");

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
					className="w-full min-h-3/4 h-fit p-8 rounded-lg bg-black text-center"
				>
					<h2 className="text-3xl text-center font-semibold mb-6 text-white">
						Create An Account
					</h2>
					<hr />
					<div className="my-6 font-semibold text-center text-white">
						Register with your email address
					</div>
					<div className="mb-4">
						<input
							type="text"
							name="name"
							placeholder="User Name..."
							required
							onChange={(e) => {
								setFields({ ...fields, name: e.target.value });
							}}
							className="w-full p-2 px-4 rounded-md"
						/>
					</div>

					<div className="mb-4">
						<input
							type="email"
							name="email"
							placeholder="Email address..."
							required
							onChange={(e) => {
								setFields({ ...fields, email: e.target.value });
							}}
							className="w-full p-2 px-4 rounded-md"
						/>
					</div>

					<div className="mb-4">
						<input
							type="password"
							name="password"
							placeholder="Password..."
							required
							onChange={(e) => {
								setFields({
									...fields,
									password: e.target.value,
								});
							}}
							className="w-full p-2 px-4 rounded-md"
						/>
					</div>

					<div className="mb-4">
						<input
							type="password"
							name="repeatPassword"
							placeholder="Repeat Password..."
							required
							onChange={(e) => {
								setFields({
									...fields,
									repeatPassword: e.target.value,
								});
							}}
							className="w-full p-2 px-4 rounded-md"
						/>
					</div>
					<div className="my-1">
						{error && (
							<p className="text-red-500 text-base font-medium">
								{"Error: " + error}
							</p>
						)}
					</div>
					<div className="flex flex-col justify-center items-center">
						<GradientButton
							className="font-bold mt-5 mb-2 w-full focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Submit
						</GradientButton>
						<Link
							to="/auth/login"
							className="p-1 flex text-center items-center underline font-light text-white"
						>
							Already have an account? Proceed to the login page
							<FaArrowRight className="inline-block ml-2" />
						</Link>
					</div>
				</form>
			</GradientCard>
		</section>
	);
};
// {/* <div className="w-1/2 h-fit flex justify-center items-start relative">
// 				{/* Shadow gradient div */}
// 				<div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-[#5539cc] from-15% to-[#0066cd] opacity-75 blur"></div>

// 			</div> */}
