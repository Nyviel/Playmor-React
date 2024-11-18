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
import { UserProvider } from "./components/providers/UserProvider";
import { Profile } from "./components/profile/Profile";

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
	{
		path: "/profile",
		element: <Profile />,
	},
]);

function App() {
	return (
		<UserProvider>
			<div className="container mx-auto p-2 xl:p-10 h-fit">
				<Navigation />
				<RouterProvider router={router} />
			</div>
			<Footer />
			<ToastContainer />
		</UserProvider>
	);
}

export default App;
