import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, roles, ...rest }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decoded = jwtDecode(token);
        const isAdmin = decoded['admin'];
        const userRole = isAdmin ? 'admin' : 'client';

        if (!roles.includes(userRole)) {
            return <Navigate to="/client" replace />;
        }

        return React.cloneElement(children, rest);
    } catch (error) {
        console.error("Token decoding failed:", error);
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;