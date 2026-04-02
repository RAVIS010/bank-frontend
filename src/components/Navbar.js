// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>BadBank</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/create-account">Create Account</Link></li>
                <li><Link to="/deposit">Deposit</Link></li>
                <li><Link to="/withdraw">Withdraw</Link></li>
                <li><Link to="/alldetails">All Details</Link></li>
                <li><Link to="/admin">Admin Dashboard</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
