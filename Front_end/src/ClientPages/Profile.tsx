import React, { useEffect, useState } from 'react';
import Header from '../components/HeaderClient';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    let decoded: any = {};
    if (token !== null) {
      decoded = jwtDecode(token);
      console.log(decoded);
    }

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

  return (
    <div className="w-full bg-white">
      < Header />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {user.firstname} {user.lastname}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {user.email}
            </p>
          </div>
          <form className="mt-8 space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  disabled
                  value={user.username || ''}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  disabled
                  value={user.email || ''}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <div className="mt-1">
                <input
                  id="address"
                  name="address"
                  type="text"
                  disabled
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={user.address || ''}
                />
              </div>
            </div>
            <div>
              <button
                onClick={() => navigate('/client/update-profile', { state: { user} })}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Modify
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
