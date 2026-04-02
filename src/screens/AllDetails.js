import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const AllDetails = () => {
    const [email, setEmail] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const handleFetchTransactions = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state
        setLoading(true); // Set loading state to true

        try {
            const response = await axios.get(`${API_BASE}/api/accounts/findAllTransactions`, {
                params: { email }
            });
            setTransactions(response.data); // Update state with fetched transactions
        } catch (error) {
            setError('Error fetching transactions. Please check the email and try again.'); // Set error message
            console.error('Error fetching transactions:', error.response ? error.response.data : error.message);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div>
            <h1>All Transactions</h1>
            <form onSubmit={handleFetchTransactions}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>Get Transactions</button> {/* Disable button when loading */}
            </form>
            {loading && <p>Loading transactions...</p>} {/* Loading message */}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            <ul>
                {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                        <li key={transaction.id}>
                            {transaction.type}: ${transaction.amount} {/* Ensure these properties exist */}
                        </li>
                    ))
                ) : (
                    <li>No transactions found.</li> // Handle empty transactions
                )}
            </ul>
        </div>
    );
};

export default AllDetails;
