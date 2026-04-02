import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const UserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAccount = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${API_BASE}/api/accounts/${id}`);
        setAccount(response.data);
      } catch (err) {
        setError(err.response?.data?.error || err.message || 'Unable to load user');
      } finally {
        setLoading(false);
      }
    };
    if (id) loadAccount();
  }, [id]);

  const deleteUser = async () => {
    if (!window.confirm('Delete this account?')) return;
    try {
      setLoading(true);
      await axios.delete(`${API_BASE}/api/accounts/${id}`);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Delete failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <h1>User Profile</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!account ? (
        <p>No user data found.</p>
      ) : (
        <div className="section-card">
          <p><strong>Name:</strong> {account.name}</p>
          <p><strong>Email:</strong> {account.email}</p>
          <p><strong>Balance:</strong> ${account.balance.toFixed(2)}</p>
          <p><strong>Created At:</strong> {new Date(account.createdAt).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(account.updatedAt).toLocaleString()}</p>
          <h4>Transactions</h4>
          {account.transactions && account.transactions.length > 0 ? (
            <ul>
              {account.transactions.map((tx, idx) => (
                <li key={idx}>{tx.type} ${tx.amount} @ {new Date(tx.date).toLocaleString()}</li>
              ))}
            </ul>
          ) : (
            <p>No transactions found.</p>
          )}
          <button onClick={() => navigate('/admin')} style={{ marginRight: 8 }}>Back to Admin</button>
          <button onClick={deleteUser} style={{ background: '#d9534f' }}>Delete User</button>
        </div>
      )}
    </div>
  );
};

export default UserPage;
