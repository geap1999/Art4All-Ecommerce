import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from '../components/HeaderClient';
import { jwtDecode } from "jwt-decode";

const ProductPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { product } = location.state || { product: null };

    const handleAddToCart = async (product_id) => {
        const confirmProduct = window.confirm("Add this product to the cart?");
        if (!confirmProduct) return;
        try {
            const token = localStorage.getItem('token');
            let decoded = ""
            if (token !== null) {
                decoded = jwtDecode(token);
                console.log(decoded);
            }
            const data = {
                product_id: product_id,
            };
            const response = await fetch(`http://127.0.0.1:8000/cart/${decoded['user_id']}/add-product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                console.log('Add to cart successful.');
                navigate('/client')
            } else {
                console.error('Add to cart failed');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

	return (
        <div className="w-full bg-white">
            <Header />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg flex">
                    <div className="w-1/2">
                        <img
                            className="rounded-lg object-cover w-full h-full"
                            src={product.image}
                            alt={product.name}
                        />
                    </div>
                    <div className="w-1/2 pl-8">
                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                        <p className="mt-4 text-gray-600">{product.description}</p>
                        <div className="mt-4">
                            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                        </div>
                        <button
                            onClick={() => handleAddToCart(product.id)}
                            type="button"
                            className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
	);
};

export default ProductPage;
