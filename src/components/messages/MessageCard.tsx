import { IMessage } from "@/interfaces/message";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";

interface IMessageCardProps {
	message: IMessage;
	isSelected: boolean;
	toggleSelection: (id: number) => void;
}

export const MessageCard = ({
	message,
	isSelected,
	toggleSelection,
}: IMessageCardProps) => {
	return (
		<a
			href={`/messages/${message.id}`}
			className={cn(
				message.isRead ? "bg-gray-900" : "bg-gray-700",
				isSelected && "bg-gray-500",
				"flex items-center max-w-full overflow-x-hidden gap-2 p-2 border-b border-gray-800 hover:bg-gray-500 cursor-pointer "
			)}
		>
			<span className="flex justify-center items-center">
				<Checkbox
					className="border border-white"
					checked={isSelected}
					onCheckedChange={() => toggleSelection(message.id)}
				/>
			</span>
			<p className="truncate ... text-gray-400">
				<span
					className={cn(
						message.isRead ? "font-normal" : "font-bold",
						"ml-4 mr-10 text-gray-200"
					)}
				>
					{message.sender.username}
				</span>
				<span
					className={cn(
						message.isRead ? "font-normal" : "font-bold",
						"text-gray-200"
					)}
				>
					{message?.title}
				</span>{" "}
				-{" "}
				<span className="text-gray-400">
					{message.content.toString()}
				</span>
			</p>
		</a>
	);
};
