import React, { useState, useEffect } from "react";
import Header from '../components/HeaderAdmin';
import { useNavigate } from "react-router-dom";

// Define the User interface
interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    address: string;
    admin: boolean;
    created_at: string;
    updated_at: string;
}

const UserListPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch('http://127.0.0.1:8000/users', {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                console.log("Fetched data:", data);
                setUsers(data); 
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        console.log("Users state:", users); // Log users state to debug
    }, [users]);

    return (
        <div className="w-full bg-white">
            <Header />
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Creation</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Update</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} className="px-6 py-4 whitespace-nowrap text-center">No users found.</td>
                                    </tr>
                                ) : (
                                    users.map((user, index) => (
                                        <tr
                                            key={index}
                                            onClick={() => navigate('/admin/update-user', { state: { user} })}
                                            className="cursor-pointer hover:bg-gray-100"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.firstname}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.lastname}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.address}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.admin ? 'Yes' : 'No'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.created_at}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.updated_at}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserListPage;
