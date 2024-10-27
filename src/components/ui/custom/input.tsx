interface IInputProps {
	name: string;
	value: string;
	setValue: CallableFunction;
	inputType: string;
	placeholder?: string;
}

export const Input = ({
	name,
	value,
	setValue,
	inputType,
	placeholder,
}: IInputProps) => {
	return (
		<div className="flex flex-col w-full">
			<label className="pb-1" htmlFor={name}>
				{name}
			</label>
			<input
				type={inputType}
				name={name}
				id={name}
				onChange={(e) => {
					setValue(e.target.value);
				}}
				{...(placeholder ? { placeholder } : {})}
				value={value}
				className="px-4 py-2 rounded bg-[#1e1e1e]"
			/>
		</div>
	);
};
