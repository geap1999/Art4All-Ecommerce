import React from 'react';

const Header: React.FC = () => {
	return (
		<header className="w-full bg-white shadow">
			<nav className="mx-auto max-w-7xl p-4 flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<a href="/" className="text-lg font-bold text-gray-900">
						Art 4 All
					</a>
				</div>
				<div>
					<a
						href="/login"
						className="text-sm font-semibold text-gray-900 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md"
					>
						Log in
					</a>
					<a
						href="/register"
						className="text-sm font-semibold text-gray-900 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md ml-4"
					>
						Sign in
					</a>
				</div>
			</nav>
		</header>
	);
};

export default Header;
