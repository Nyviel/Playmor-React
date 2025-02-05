import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { Bounce, ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { Navigation } from "./components/navigation/Navigation";
import { Footer } from "./components/footer/Footer";
import { AuthProvider } from "./components/providers/AuthProvider";
import { router } from "./routing";

function App() {
	return (
		<AuthProvider>
			<div className="container mx-auto px-4 md:px-0 p-2 xl:p-10 h-fit">
				<Navigation />
				<RouterProvider router={router} />
			</div>
			<Footer />
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
				transition={Bounce}
			/>
		</AuthProvider>
	);
}

export default App;
