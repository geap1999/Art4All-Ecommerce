import { useNavigate } from "react-router-dom";
import React from "react";

const Header: React.FC = () => {
	const navigate = useNavigate();
	const handleLogout = async () => {
		localStorage.clear();
		navigate("/login");
	};

	return (
		<header className="w-full bg-white shadow">
			<nav className="mx-auto max-w-7xl p-4 flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<a href="/client" className="text-lg font-bold text-gray-900">
						Art 4 All
					</a>
				</div>
				<div>
					<a
						href="/client/cart"
						className="text-sm font-semibold text-gray-900 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md"
					>
						Cart
					</a>
					<a
						href="/client/orders"
						className="text-sm font-semibold text-gray-900 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md ml-4"
					>
						Orders
					</a>
					<a
						href="/client/profile"
						className="text-sm font-semibold text-gray-900 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md ml-4"
					>
						Profile
					</a>
					<a
						onClick={handleLogout}
						className="text-sm font-semibold text-gray-900 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md ml-4"
					>
						Logout
					</a>
				</div>
			</nav>
		</header>
	);
};

export default Header;
