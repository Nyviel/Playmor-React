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
		<div className="flex flex-col w-full text-start">
			<label className="pb-2" htmlFor={name}>
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
				className="px-4 py-2 rounded bg-slate-900 border border-white placeholder-gray-200"
			/>
		</div>
	);
};
