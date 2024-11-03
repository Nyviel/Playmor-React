import { IDeal } from "@/interfaces/deal";
import { SHARK_API } from "@/utilities/constants";

export const fetchDeals = async (amount: number = 6): Promise<IDeal[]> => {
	const response = await fetch(`${SHARK_API}/deals?pageSize=${amount}`);

	if (!response.ok) {
		console.error("Encountered error when fetching cheapshark deals");
		throw new Error("Error encountered: " + response.status);
	}

	return response.json();
};
