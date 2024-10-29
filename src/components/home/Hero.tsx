import { PlaymorTitle } from "../utils/PlaymorTitle";

export const Hero = () => {
	return (
		<section className="py-12 mb-4">
			<h1 className="text-5xl mt-4 font-bold text-white">
				Find your next game with <PlaymorTitle />
			</h1>
			<p className="my-4 text-2xl text-white">
				Discover the perfect title for you.
			</p>
		</section>
	);
};
