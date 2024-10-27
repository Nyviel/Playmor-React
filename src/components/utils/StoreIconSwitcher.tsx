import { FaLink, FaMicrosoft, FaSteam, FaXbox } from "react-icons/fa";
import { SiEpicgames, SiGogdotcom, SiNintendo, SiSony } from "react-icons/si";

export const StoreIconSwitcher = ({ iconName }: { iconName: string }) => {
	const iconSize = "4em";
	return (
		<div className="bg-black/25 p-2 rounded">
			{iconName.toLowerCase() == "steam" && <FaSteam size={iconSize} />}
			{iconName.toLowerCase() == "xbox" && <FaXbox size={iconSize} />}
			{iconName.toLowerCase() == "microsoft" && (
				<FaMicrosoft size={iconSize} />
			)}
			{iconName.toLowerCase() == "epicgames" && (
				<SiEpicgames size={iconSize} />
			)}
			{iconName.toLowerCase() == "gog" && <SiGogdotcom size={iconSize} />}
			{iconName.toLowerCase() == "nintendo" && (
				<SiNintendo size={iconSize} />
			)}
			{iconName.toLowerCase() == "sony" && <SiSony size={iconSize} />}
			{iconName.toLowerCase() == "other" && <FaLink size={iconSize} />}
		</div>
	);
};
