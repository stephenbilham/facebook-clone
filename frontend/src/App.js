import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/login" element={<Login />} exact />
				<Route path="/profile" element={<Profile />} exact />
				<Route path="/" element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
