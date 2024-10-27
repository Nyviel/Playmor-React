import { IOption } from "@/interfaces/option";

interface ISelectProps {
	name: string;
	value: string;
	setValue: CallableFunction;
	options: IOption[];
}

export const Select = ({ name, value, setValue, options }: ISelectProps) => {
	return (
		<div className="flex flex-col border-b border-white mb-2 pb-2">
			<label htmlFor={name}>{name}</label>
			<select
				className="my-1 px-4 py-2 rounded bg-[#1e1e1e]"
				name={name}
				id={name}
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
			>
				{options.map((option, index) => {
					return (
						<option key={index} value={option.value}>
							{option.label}
						</option>
					);
				})}
			</select>
		</div>
	);
};
