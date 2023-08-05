import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Logged in successfully:', data);
        // Redirect to dashboard or home page upon successful login
        // You can use React Router's history or other navigation methods for this.
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      // Handle login error
      console.error('Login error:', error.message);
    }
  };

  return (
    <div className="bg-[#004e96] min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login to your account</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="manoj@richpanel.com"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Password</label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*********"
            />
          </div>
          <div className="mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Remember me</span>
            </label>
          </div>
          <button
            type="submit"
            className="bg-[#004e96] text-white  rounded w-full py-2 px-3 "
          >
            Login
          </button>
        </form>
        <p className="text-sm mt-4 text-center">
          New to the app?{' '}
          <Link to="/signup" className="text-[#004e96]">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
