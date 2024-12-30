import { IUserGame } from "@/interfaces/userGame";
import { ColumnDef } from "@tanstack/react-table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { toast } from "react-toastify";
import { deleteUserGameAsync } from "@/services/userGameService";
export const columns: ColumnDef<IUserGame>[] = [
	{
		accessorKey: "game.cover",
		header: "Cover",
		cell: ({ row }) => {
			const coverUrl = row.original.game.cover;
			return (
				<img
					src={coverUrl}
					alt="Game Cover"
					style={{
						width: "100px",
						height: "100px",
						objectFit: "cover",
					}}
				/>
			);
		},
	},
	{
		accessorKey: "game.title",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Title
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "score",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Score
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Date added
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const parsedDate = new Date(
				row.original.createdAt
			).toLocaleDateString();
			return parsedDate;
		},
	},
	{
		accessorKey: "actions",
		header: "Actions",
		cell: ({ row }) => {
			const userGameId = row.original.id;

			const handleEdit = () => {
				console.log("Edit clicked for", row.original);
			};

			const handleDelete = async () => {
				const res = await deleteUserGameAsync(userGameId);
				if (res) {
					toast.success("Successfully deleted entry");
				} else {
					toast.error("Failed to delete entry");
				}
			};

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="sm">
							⋮
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem onClick={handleEdit}>
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem onClick={handleDelete}>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
