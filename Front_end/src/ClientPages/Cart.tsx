import React, { useEffect, useState } from 'react';
import Header from '../components/HeaderClient';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const CartPageClient: React.FC = () => {
    const [cart, setCart] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    let decoded: any = "";
    if (token !== null) {
        decoded = jwtDecode(token);
        console.log(decoded);
    }

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/cart/${decoded['user_id']}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const jsonData = await response.json();
                setCart(jsonData);
                console.log(jsonData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, []);

    const handlePay = async () => {
        if(cart.products.length === 0){
            setErrorMessage('No products in cart!');
        }
        const confirmOrder = window.confirm("Pay for these items?");
        if (!confirmOrder) return;
        try {
            const response = await fetch(`http://127.0.0.1:8000/cart/${decoded['user_id']}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.ok) {
                navigate('/client/orders');
            } else {
                console.error('Failed to send order.');
            }
        } catch (error) {
            console.error('Failed to send order.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleRemove = async (productId: string) => {
        const confirmRemove = window.confirm("Remove this product from your cart?");
        if (!confirmRemove) return;

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `http://127.0.0.1:8000/cart/${decoded['user_id']}/remove-product`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(productId),
                }
            );

            if (response.ok) {
                console.log("Product removed successfully.");
                window.location.reload();
            } else {
                console.error("Failed to remove product.");
            }
        } catch (error) {
            console.error("Error occurred while removing product:", error);
        }
    };

    return (
        <div className="w-full bg-white">
            <Header />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
                <div className="mt-6 p-4 border rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold">Products in Cart</h2>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        cart.products.map((product) => (
                            <a key={product.id} href={product.href} className="group">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                    <img
                                        src={product.image}
                                        alt={product.description}
                                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                                        onClick={() => navigate('/Product')}
                                    />
                                </div>
                                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">{product.price * product.quantity}$</p>
                                <p className="mt-1 text-lg font-medium text-gray-900">x{product.quantity}</p>
                                <button
                                    onClick={() => handleRemove(product.id)}
                                    className="mt-2 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500"
                                >
                                    Remove from cart?
                                </button>
                            </a>
                        ))
                    )}
                    </div>
                </div>
                <div className="mt-6 p-4 border-t">
                    <h2 className="text-2xl font-bold">Cart Summary</h2>
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-lg font-semibold">Total:</p>
                        <p className="text-lg font-bold">${cart.total_price}</p>
                    </div>
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={() => handlePay()}
                            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Pay Now
                        </button>
                    </div>
                    {errorMessage && (
                        <div className="text-red-500 text-sm">
                            {errorMessage}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartPageClient;
