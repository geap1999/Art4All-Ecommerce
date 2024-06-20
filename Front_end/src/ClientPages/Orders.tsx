import React, { useEffect, useState } from 'react';
import Header from '../components/HeaderClient';
import { jwtDecode } from "jwt-decode";

const OrderPage = () => {
    const [orders, setOrders] = useState<any>([]);
    const [user, setUser] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState('');

    const token = localStorage.getItem("token");
    let decoded: any = {};
    if (token !== null) {
        decoded = jwtDecode(token);
    }

    const getFormatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };
    
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/orders/${decoded['user_id']}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setErrorMessage('Error fetching orders');
            }
        };

        fetchOrders();
            }, [decoded, token]);

        useEffect(() => {
            const fetchUser = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/users/${decoded['user_id']}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    });

                    if (response.ok) {
                        const jsonData = await response.json();
                        setUser(jsonData);
                        setLoading(false);
                    } else {
                        console.error('Failed to fetch user data.');
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

        fetchUser();
            }, []);

    const handleCancelOrder = async (orderId, orderStatus) => {
        if (orderStatus == "Canceled") return;
        const confirmCancel = window.confirm("Cancel Order?");
        if (!confirmCancel) return;

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/order-cancel/${decoded['user_id']}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(orderId),
                }
            );

            if (response.ok) {
                console.log("Order canceled.");
                window.location.reload();
            } else {
                const result = await response.json();
                console.error(result);
            }
        } catch (error) {
            console.error("Error occurred while cancelling product:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold text-center mb-8">Order Details</h1>
                <div className="space-y-6">
                    {loading ? (
                        <p className="text-center">Loading...</p>
                    ) : errorMessage ? (
                        <p className="text-center text-red-500">{errorMessage}</p>
                    ) : (
                        orders.map((order: any) => (
                            order.products.map((product: any) => (
                                <div key={product.id} className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-32 h-32 object-cover rounded-lg"
                                    />
                                    <div className="ml-6 flex flex-col justify-between flex-grow">
                                        <div>
                                            <h2 className="text-2xl font-bold">{product.name}</h2>
                                            <p className="text-gray-600">{product.description}</p>
                                            <p className="text-gray-600">Date of order: {getFormatDate(order.updated_at)}</p>
                                            <p className="text-gray-600">Address: {user.address}</p>
                                            <p className="mt-1 text-lg font-medium text-gray-900">{order.status}.</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <p className="text-gray-900">Quantity: {product.quantity}</p>
                                            <p className="text-gray-900">Price: ${product.price * product.quantity}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleCancelOrder(order.id, order.status)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg ml-4"
                                    >
                                        Cancel Order
                                    </button>
                                </div>
                            ))
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
