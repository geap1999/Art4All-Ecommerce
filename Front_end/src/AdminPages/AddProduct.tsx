import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from '../components/HeaderAdmin';

const AddProductPage: React.FC = () => {
    const navigate = useNavigate();
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productImageUrl, setProductImageUrl] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            name: productName,
            description: productDescription,
            price: productPrice,
            image: productImageUrl,
        };

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
            `http://127.0.0.1:8000/products`,
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
                console.log("Product added successfully.");
                navigate("/admin");
            } else {
                console.error("Failed to add product.");
            }
        } catch (error) {
            console.error("Error occurred while adding product:", error);
        }
    };

    return (
    <div className="w-full bg-white">
        <Header />
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-lg">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Update Product
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Product Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Product Description
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="description"
                                name="description"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="price"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Product Price
                        </label>
                        <div className="mt-2">
                            <input
                                id="price"
                                name="price"
                                type="number"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="image"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Product Image URL
                        </label>
                        <div className="mt-2">
                            <input
                                id="image"
                                name="image"
                                type="url"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={productImageUrl}
                                onChange={(e) => setProductImageUrl(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}

export default AddProductPage;
