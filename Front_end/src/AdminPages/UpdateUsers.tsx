import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from '../components/HeaderAdmin';

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

const UserUpdatePage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = location.state || { user: null };

    const [userId, setUserId] = useState<number>(user ? user.id : 0);
    const [userFirstname, setUserFirstname] = useState<string>(user ? user.firstname : "");
    const [userLastname, setUserLastname] = useState<string>(user ? user.lastname : "");
    const [userEmail, setUserEmail] = useState<string>(user ? user.email : "");
    const [userUsername, setUserUsername] = useState<string>(user ? user.username : "");
    const [userAddress, setUserAddress] = useState<string>(user ? user.address : "");
    const [userAdmin, setUserAdmin] = useState<boolean>(user ? user.admin : false);
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");


    const data = {
            id: userId,
            firstname: userFirstname,
            lastname: userLastname,
            email: userEmail,
            username: userUsername,
            password: newPassword,
            address: userAddress,
            admin: userAdmin
        };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `http://127.0.0.1:8000/users/${data.id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.ok) {
                console.log("User updated successfully.");
                navigate("/admin/users");
            } else {
                console.error("Failed to update user.");
            }
        } catch (error) {
            console.error("Error occurred while updating user:", error);
        }
    };

    const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            console.error("Passwords do not match.");
            return;
        }
        console.log(newPassword)
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `http://127.0.0.1:8000/users/${data.id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.ok) {
                navigate("/admin/users");
                console.log("Password changed successfully.");
            } else {
                console.error("Failed to change password.");
            }
        } catch (error) {
            console.error("Error occurred while changing password:", error);
        }
    };

    const handleDelete = async (userId: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `http://127.0.0.1:8000/users/${userId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                navigate("/admin/users");
                console.log("Product deleted successfully.");
            } else {
                console.error("Failed to delete user.");
            }
        } catch (error) {
            console.error("Error occurred while deleting user:", error);
        }
    };

    return (
        <div className="w-full bg-white">
            <Header />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-lg">
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Update Profile
                    </h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="userId"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                User ID
                            </label>
                            <div className="mt-2">
                                <input
                                    id="userId"
                                    name="userId"
                                    type="text"
                                    readOnly
                                    className="block w-full rounded-md border-0 py-1.5 bg-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                                    value={userId}
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="firstname"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                User Firstname
                            </label>
                            <div className="mt-2">
                                <input
                                    id="Firstname"
                                    name="Firstname"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={userFirstname}
                                    onChange={(e) => setUserFirstname(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="lastname"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                User Lastname
                            </label>
                            <div className="mt-2">
                                <input
                                    id="Lastname"
                                    name="Lastname"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={userLastname}
                                    onChange={(e) => setUserLastname(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="Email"
                                    name="Email"
                                    type="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="Username"
                                    name="Username"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={userUsername}
                                    onChange={(e) => setUserUsername(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="address"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                User Address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="address"
                                    name="address"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={userAddress}
                                    onChange={(e) => setUserAddress(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Update User
                            </button>
                        </div>
                    </form>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
                    <form className="space-y-6" onSubmit={handleChangePassword}>
                        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
                            Change Password
                        </h2>
                        <div>
                            <label
                                htmlFor="newPassword"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                New Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Confirm New Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
                    <button
                        onClick={() => handleDelete(user.id)}
                        className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Delete User
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserUpdatePage;
