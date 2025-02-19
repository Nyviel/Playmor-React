import { createBrowserRouter } from "react-router-dom";
import { Home } from "./components/home/Home";
import { Game } from "./components/game/Game";
import { Explore } from "./components/explore/Explore";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Profile } from "./components/profile/Profile";
import { Usergames } from "./components/usergames/Usergames";
import { Notifications } from "./components/notifications/Notifications";
import { Messages } from "./components/messages/Messages";
import { MessageCreate } from "./components/messages/MessageCreate";
import { Message } from "./components/messages/Message";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
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
		path: "/profile/:userId",
		element: <Profile />,
	},
	{
		path: "/usergames/:userId",
		element: <Usergames />,
	},
	{
		element: <ProtectedRoute />,
		children: [
			{ path: "/notifications", element: <Notifications /> },
			{ path: "/messages", element: <Messages /> },
			{ path: "/messages/:id", element: <Message /> },
			{
				path: "/messages/create/:recipientId",
				element: <MessageCreate />,
			},
		],
	},
]);
