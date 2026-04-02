import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const Withdraw = () => {
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');

    const handleWithdraw = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE}/api/accounts/withdraw`, {
                email,
                amount: parseFloat(amount), // Ensure amount is a number
            });
            console.log('Withdraw successful:', response.data);
        } catch (error) {
            console.error('Error during withdraw:', error.response.data);
        }
    };

    return (
        <div>
            <h1>Withdraw</h1>
            <form onSubmit={handleWithdraw}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <button type="submit">Withdraw</button>
            </form>
        </div>
    );
};

export default Withdraw;
