import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const CreateAccount = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [depositAmount, setDepositAmount] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Reset error before making the request

        try {
            const response = await axios.post(`${API_BASE}/api/accounts/create`, {
                name,
                email,
                password,
                depositAmount: parseFloat(depositAmount), // Ensure it's a number
            });
            console.log('Account created:', response.data);
            // Reset fields if needed
            setName('');
            setEmail('');
            setPassword('');
            setDepositAmount('');
        } catch (error) {
            console.error('Error creating account:', error.response ? error.response.data : error.message);
            setError('Error creating account: ' + (error.response?.data || error.message));  // Set error message
        }
    };

    return (
        <div>
            <h1>Create Account</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message */}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input
                    type="number"
                    placeholder="Initial Deposit Amount"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    required
                />
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
};

export default CreateAccount;
