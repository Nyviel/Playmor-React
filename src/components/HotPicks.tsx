import "../assets/css/HotPicks.css";

import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { IGame } from "../interfaces/game";
import { API } from "../utilities/constants";
import { fetchHotPicks } from "../services/gameService";

export const HotPicks = () => {
	const [hotPicks, setHotPicks] = useState<IGame[]>();
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		const getHotPicks = async () => {
			try {
				const response = await fetchHotPicks();
				if (response.ok) {
					setHotPicks(
						(await response.json())
							.sort(() => Math.random() - Math.random())
							.splice(0, 3)
					);
				} else {
					console.error("Failed to fetch hot picks");
				}
			} catch (error) {
				console.error(`Failed to fetch hot picks: ${error}`);
				toast.error(`Failed to fetch hot picks: ${error}`);
			}
		};
		getHotPicks();
	}, []);

	// Animation handler
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const card = e.currentTarget as HTMLElement;
			onMouseMove(e, card);
		};

		const handleMouseLeave = (e: MouseEvent) => {
			const card = e.currentTarget as HTMLElement;
			onMouseLeave(card);
		};

		const cards = cardRefs.current;

		// Attach event listeners to each card ref
		cards.forEach((card) => {
			if (card) {
				card.addEventListener("mousemove", handleMouseMove);
				card.addEventListener("mouseleave", handleMouseLeave);
			}
		});

		// Clean up event listeners
		return () => {
			cards.forEach((card) => {
				if (card) {
					card.removeEventListener("mousemove", handleMouseMove);
					card.removeEventListener("mouseleave", handleMouseLeave);
				}
			});
		};
	}, [hotPicks]); // Depend on hotPicks so the effect runs only when the data is ready

	const onMouseMove = (e: MouseEvent, card: HTMLElement) => {
		const rect = card.getBoundingClientRect();
		const cardWidth = rect.width;
		const cardHeight = rect.height;
		const centerX = rect.left + cardWidth / 2;
		const centerY = rect.top + cardHeight / 2;
		const mouseX = e.clientX - centerX;
		const mouseY = e.clientY - centerY;
		const rotateX = mouseY / 15; // Reverse the rotation axis
		const rotateY = -mouseX / 15;
		card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
	};

	const onMouseLeave = (card: HTMLElement) => {
		card.style.transform = "rotateX(0deg) rotateY(0deg)";
	};

	return (
		<section>
			<h2 className="text-3xl mt-4 font-bold text-white">
				Current hot picks
			</h2>

			<div className="flex gap-12 flex-wrap my-4">
				{hotPicks?.map((pick, index) => {
					return (
						<article key={pick.id}>
							<Link to={`/game/${pick.id}`}>
								<div
									ref={(el) => (cardRefs.current[index] = el)} // Store ref for each card
									className="h-[650px] w-[450px] border border-violet-500 card"
								>
									<img
										src={`${API}/proxy-image?imageUrl=${encodeURIComponent(
											pick.cover
										)}`}
										alt=""
									/>
								</div>
							</Link>
						</article>
					);
				})}
			</div>
		</section>
	);
};
