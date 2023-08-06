import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Payment from './components/Payment'
import PlansPage from './components/Plans';

const App = () => {
  

  // Function to handle login and set isAuthenticated to true upon successful login

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/payment" element={<Payment/>} /> 
        <Route path="/plans" element={<PlansPage/>} /> 
        <Route path="/" element={<h1>Home Page</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
