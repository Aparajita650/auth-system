import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Dashboard from "./pages/dashboard.jsx";

const isAuthenticated = () => Boolean(localStorage.getItem("token"));

const ProtectedRoute = ({ children }) => {
	if (!isAuthenticated()) return <Navigate to="/login" replace />;
	return children;
};

const App = () => {
	return (
		<Routes>
			<Route path="/" element={
				<ProtectedRoute>
					<Dashboard />
				</ProtectedRoute>
			} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};

export default App;
