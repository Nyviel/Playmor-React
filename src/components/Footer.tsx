export const Footer = () => {
	return (
		<footer className="w-full h-[100px] flex justify-center items-center bg-transparent text-white border-t border-white">
			Created by
			<a
				className="ml-1 mr-2"
				target="_blank"
				href="https://github.com/Nyviel"
			>
				Przemysław Kaczmarski
			</a>
			&#169;
			{new Date().getFullYear()}
		</footer>
	);
};
