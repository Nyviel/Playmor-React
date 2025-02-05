import { IUserRegisterFields } from "@/interfaces/userRegisterFields";
import { FormEvent, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { GradientButton } from "../ui/custom/gradientButton";
import { GradientCard } from "../ui/custom/gradientCard";
import { Input } from "../ui/custom/input";
import {
	EMAIL_MAX_LENGTH,
	NAME_MAX_LENGTH,
	PASSWORD_MAX_LENGTH,
} from "@/utilities/constants";
import { register } from "@/services/authService";
import { toast } from "react-toastify";
export const Register = () => {
	const [fields, setFields] = useState<IUserRegisterFields>({
		name: "",
		email: "",
		password: "",
		repeatPassword: "",
	});
	const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleFormSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError("");

		const parsedName = fields.name.trim();
		const parsedEmail = fields.email.trim();
		const parsedPassword = fields.password.trim();
		const parsedRepeatPassword = fields.password.trim();

		if (parsedName.length > NAME_MAX_LENGTH) {
			setError(`Name can't exceed ${NAME_MAX_LENGTH}`);
		}

		if (parsedEmail.length > EMAIL_MAX_LENGTH) {
			setError(`Email can't exceed ${EMAIL_MAX_LENGTH}`);
		}

		if (parsedPassword.length > PASSWORD_MAX_LENGTH) {
			setError(`Password can't exceed ${PASSWORD_MAX_LENGTH}`);
		}

		if (parsedPassword != parsedRepeatPassword) {
			setError("Passwords do not match");
		}

		if (error) {
			return;
		}

		try {
			setIsAwaitingResponse(true);
			await register(parsedName, parsedEmail, parsedPassword);
			toast.success("New user registered successfully!");
			navigate("/auth/login");
		} catch (err) {
			console.error(
				`Error occured when registering user: ${JSON.stringify(err)}`
			);
			toast.error("Failed to register new user.");
		} finally {
			setIsAwaitingResponse(false);
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
					className="w-full h-fit p-8 text-center"
				>
					<h2 className="text-3xl text-center font-semibold mb-6 text-white">
						Create An Account
					</h2>
					<hr />
					<div className="my-6 font-semibold text-center text-white">
						Register with your email address
					</div>
					<div className="mb-4">
						<Input
							inputType="text"
							name="Username"
							placeholder="Enter your username..."
							value={fields.name}
							setValue={(val: string) => {
								setFields({ ...fields, name: val });
							}}
						/>
					</div>

					<div className="mb-4">
						<Input
							inputType="email"
							name="Email"
							placeholder="Enter your email address..."
							value={fields.email}
							setValue={(val: string) => {
								setFields({ ...fields, email: val });
							}}
						/>
					</div>

					<div className="mb-4">
						<Input
							inputType="password"
							name="Password"
							placeholder="Enter your password..."
							value={fields.password}
							setValue={(val: string) => {
								setFields({ ...fields, password: val });
							}}
						/>
					</div>

					<div className="mb-4">
						<Input
							inputType="password"
							name="Repeat password"
							placeholder="Enter your password again..."
							value={fields.repeatPassword}
							setValue={(val: string) => {
								setFields({ ...fields, repeatPassword: val });
							}}
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
							disabled={isAwaitingResponse}
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
