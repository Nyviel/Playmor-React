import { FreshDeals } from "./FreshDeals";
import { Hero } from "./Hero";
import { HotPicks } from "./HotPicks";
import { RecentlyReleased } from "./RecentlyReleased";

export const Home = () => {
	return (
		<section>
			<Hero />
			<HotPicks />
			<RecentlyReleased />
			<FreshDeals />
		</section>
	);
};
