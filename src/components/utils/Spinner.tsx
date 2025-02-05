import { PacmanLoader } from "react-spinners";

interface ISpinnerProps {
	color?: string;
	loading: boolean;
}

export const Spinner = ({ color = "#5539cc", loading }: ISpinnerProps) => {
	return (
		<PacmanLoader
			color={color}
			loading={loading}
			size={150}
			aria-label="Loading Spinner"
			data-testid="loader"
		/>
	);
};
