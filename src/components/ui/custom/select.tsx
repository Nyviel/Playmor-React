import { IOption } from "@/interfaces/option";

interface ISelectProps {
	name: string;
	value: string;
	setValue: CallableFunction;
	options: IOption[];
}

export const Select = ({ name, value, setValue, options }: ISelectProps) => {
	return (
		<div className="flex flex-col">
			<label className="pb-2" htmlFor={name}>
				{name}
			</label>
			<select
				className="px-4 py-2 rounded bg-slate-900 border border-white"
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
