import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./components/home/Home";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { Game } from "./components/game/Game";
import { Explore } from "./components/explore/Explore";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";

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
	{
		path: "/auth/login",
		element: <Login />,
	},
	{
		path: "/auth/register",
		element: <Register />,
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
