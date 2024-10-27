import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../ui/pagination";

export const ExploreResultsPagination = ({
	page,
	totalPages,
	changePage,
}: {
	page: number;
	totalPages: number;
	changePage: CallableFunction;
}) => {
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={() => {
							if (page > 1) changePage(page - 1);
						}}
					/>
				</PaginationItem>
				{Array.from({ length: totalPages }, (_, i) => i).map((i) => {
					const isActive = i + 1 == page;
					return (
						<PaginationItem key={i}>
							<PaginationLink
								onClick={() => {
									changePage(i + 1);
								}}
								isActive={isActive}
							>
								{i + 1}
							</PaginationLink>
						</PaginationItem>
					);
				})}
				<PaginationItem>
					<PaginationNext
						onClick={() => {
							if (page < totalPages) changePage(page + 1);
						}}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
