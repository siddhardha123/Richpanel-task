import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import baseUrl from '../BaseUrl.json'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // Import axios

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl.url}/signup`, {
        "email" : email,
        "name" : name,
        "password" : password,
      });

      if (response.status === 200) {
        const data = response.data;
        console.log('Signed up successfully:', data);
        toast.success('Signed up successfully!'); // Show success toast
        navigate('/login');
      } else {
        throw new Error('Signup failed');
      }
    } catch (error) {
      // Handle signup error
      console.error('Signup error:', error.message);
      toast.error('Signup failed! Please try again.'); // Show error toast
    }
  };

  return (
    <>
    <div className="bg-[#004e96] min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Create an account</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Manoj Kumar"
            />
          </div>
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
            className="bg-[#004e96] text-white rounded w-full py-2 px-3"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-[#004e96]">
            Login
          </Link>
        </p>
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default Signup;
