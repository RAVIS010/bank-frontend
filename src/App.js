// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './screens/Home';
import CreateAccount from './screens/CreateAccount';
import Deposit from './screens/Deposit';
import Withdraw from './screens/Withdraw';
import AllDetails from './screens/AllDetails';
import AdminDashboard from './screens/AdminDashboard';
import UserPage from './screens/UserPage';
import './App.css'; // Optional: Your global styles

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/deposit" element={<Deposit />} />
                <Route path="/withdraw" element={<Withdraw />} />
                <Route path="/alldetails" element={<AllDetails />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/user/:id" element={<UserPage />} />
            </Routes>
        </Router>
    );
};

export default App;
