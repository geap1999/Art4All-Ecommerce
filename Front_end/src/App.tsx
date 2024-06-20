import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Home';
import HomePageClient from './ClientPages/HomeClient';
import ProfilePage from './ClientPages/Profile';
import ProfileUpdatePage from './ClientPages/UpdateProfile';
import ProductPage from './ClientPages/Product'
import CartPageClient from './ClientPages/Cart';
import OrderPage from './ClientPages/Orders'
import HomePageAdmin from './AdminPages/HomeAdmin';
import ProductUpdatePage from './AdminPages/UpdateProduct';
import AddProductPage from './AdminPages/AddProduct';
import UserListPage from './AdminPages/Users';
import UserUpdatePage from './AdminPages/UpdateUsers';
import LoginPage from './Login';
import RegisterPage from './Register';
import Footer from './components/Footer';
import ProtectedRoute from './Functions/ProtectRoute';
import "./App.css";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Router>
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage path="/" />} />
            <Route path="/login" element={<LoginPage path="/login" />} />
            <Route path="/register" element={<RegisterPage path="/register" />} />
            <Route path="/client" element={<ProtectedRoute roles={['client', 'admin']}><HomePageClient /></ProtectedRoute>} />
            <Route path="/client/product" element={<ProtectedRoute roles={['client', 'admin']}><ProductPage /></ProtectedRoute>} />
            <Route path="client/profile" element={<ProtectedRoute roles={['client', 'admin']}><ProfilePage /></ProtectedRoute>} />
            <Route path="client/update-profile" element={<ProtectedRoute roles={['client', 'admin']}><ProfileUpdatePage /></ProtectedRoute>} />
            <Route path="client/cart" element={<ProtectedRoute roles={['client', 'admin']}><CartPageClient /></ProtectedRoute>} />
            <Route path="client/orders" element={<ProtectedRoute roles={['client', 'admin']}><OrderPage /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute roles={['admin']}><HomePageAdmin /></ProtectedRoute>} />
            <Route path="admin/update-product" element={<ProtectedRoute roles={['admin']}><ProductUpdatePage /></ProtectedRoute>} />
            <Route path="admin/add-product" element={<ProtectedRoute roles={['admin']}><AddProductPage /></ProtectedRoute>} />
            <Route path="admin/users" element={<ProtectedRoute roles={['admin']}><UserListPage /></ProtectedRoute>} />
            <Route path="admin/update-user" element={<ProtectedRoute roles={['admin']}><UserUpdatePage /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
