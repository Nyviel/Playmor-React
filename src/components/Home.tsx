import { Hero } from "./Hero";
import { HotPicks } from "./HotPicks";

export const Home = () => {
	return (
		<section>
			<Hero />
			<HotPicks />
			<section className="flex gap-6">
				<div className="w-full">{/* <RecentlyAdded /> */}</div>
				<div className="w-full">{/* <RecentlyReleased /> */}</div>
			</section>
		</section>
	);
};
