import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IOption } from "@/interfaces/option";
import { ChevronDown } from "lucide-react";

interface IMultiSelectProps {
	label?: string;
	placeholder?: string;
	options: IOption[];
	selectedOptions: string[];
	setSelectedOptions: CallableFunction;
}

const MultiSelect = ({
	label,
	placeholder,
	options,
	selectedOptions,
	setSelectedOptions,
}: IMultiSelectProps) => {
	const handleSelectChange = (option: string) => {
		if (!selectedOptions.includes(option)) {
			setSelectedOptions([...selectedOptions, option]);
		} else {
			setSelectedOptions(
				selectedOptions.filter((item) => item !== option)
			);
		}
	};

	const isOptionSelected = (option: string): boolean => {
		return selectedOptions.includes(option) ? true : false;
	};

	return (
		<div className="flex flex-col w-full">
			<label className="pb-1" htmlFor="fromDate">
				{label}
			</label>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button className="w-full bg-[#1e1e1e] flex items-center justify-between break-words whitespace-break-spaces h-fit">
						<p>{placeholder}</p>
						<ChevronDown className="h-4 w-4 opacity-50" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-[325px] overflow-y-auto h-fit max-h-[400px] bg-[#1e1e1e] text-white"
					onCloseAutoFocus={(e) => e.preventDefault()}
				>
					{options.map(
						(
							option: IMultiSelectProps["options"][0],
							index: number
						) => {
							return (
								<DropdownMenuCheckboxItem
									onSelect={(e) => e.preventDefault()}
									key={index}
									checked={isOptionSelected(option.value)}
									onCheckedChange={() =>
										handleSelectChange(option.value)
									}
								>
									{option.label}
								</DropdownMenuCheckboxItem>
							);
						}
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default MultiSelect;
