import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./components/Home";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { Game } from "./components/Game";
import { Explore } from "./components/Explore";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "game/:gameId",
		element: <Game />,
	},
	{
		path: "explore",
		element: <Explore />,
	},
]);

function App() {
	return (
		<>
			<div className="container mx-auto p-10 h-fit">
				<Navigation />
				<RouterProvider router={router} />
			</div>
			<Footer />
			<ToastContainer />
		</>
	);
}

export default App;
