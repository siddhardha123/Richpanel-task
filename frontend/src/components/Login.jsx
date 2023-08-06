import React, { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../AppContext';
import baseUrl from '../BaseUrl.json'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data, setData } = useContext(AppContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl.url}/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Logged in successfully');
        toast.success('Login successful');
        const { name } = response.data;
        setData({ ...data, name : name });
        toast.success(`Login successful. Welcome, ${name}!`);
        navigate('/plans');

      } else if (response.status === 401) {
        throw new Error('Invalid credentials');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      // Handle login error
      console.error('Login error:', error.message);
      toast.error('Login failed! Please check your credentials.');
    }
  };

  return (
    <>
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
    <ToastContainer />
    </>
  );
};

export default Login;
