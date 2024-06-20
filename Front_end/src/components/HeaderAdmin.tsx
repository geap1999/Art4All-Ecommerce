import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
	const navigate = useNavigate();
	const handleLogout = async () => {
		localStorage.clear();
		navigate('/login');
	};
	return (
		<header className="w-full bg-white shadow">
			<nav className="mx-auto max-w-7xl p-4 flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<a href="/admin" className="text-lg font-bold text-gray-900">
						Art 4 All
					</a>
				</div>
				<div>
					<a
						href="/client"
						className="text-sm font-semibold text-gray-900 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md"
					>
						Client Side
					</a>
					<a
						href="/admin/users"
						className="text-sm font-semibold text-gray-900 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md ml-4"
					>
						See Users
					</a>
					<a
						href="/admin/add-product"
						className="text-sm font-semibold text-gray-900 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md ml-4"
					>
						Add product
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
