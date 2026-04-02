import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const AdminDashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [balanceEdits, setBalanceEdits] = useState({});
  const [workingId, setWorkingId] = useState(null);

  const loadAccounts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE}/api/accounts`);
      setAccounts(response.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to load accounts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user permanently?')) {
      return;
    }

    try {
      setWorkingId(id);
      await axios.delete(`${API_BASE}/api/accounts/${id}`);
      setAccounts((prev) => prev.filter((account) => account._id !== id));
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Delete failed');
    } finally {
      setWorkingId(null);
    }
  };

  const handleBalanceUpdate = async (account) => {
    const newBalance = parseFloat(balanceEdits[account._id]);
    if (Number.isNaN(newBalance) || newBalance < 0) {
      setError('Balance must be a non-negative number');
      return;
    }

    try {
      setWorkingId(account._id);
      const response = await axios.put(`${API_BASE}/api/accounts/${account._id}`, {
        balance: newBalance,
      });
      setAccounts((prev) => prev.map((item) => (item._id === account._id ? response.data.account : item)));
      setBalanceEdits((prev) => ({ ...prev, [account._id]: '' }));
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Update failed');
    } finally {
      setWorkingId(null);
    }
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      {loading && <p>Loading accounts...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="section-card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Balance</th>
              <th>Manage</th>
              <th>Transactions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.length === 0 && !loading && (
              <tr>
                <td colSpan="5">No accounts found.</td>
              </tr>
            )}

            {accounts.map((account) => (
              <tr key={account._id || account.id}>
                <td data-label="Name">{account.name}</td>
                <td data-label="Email">{account.email}</td>
                <td data-label="Balance">${account.balance.toFixed(2)}</td>
                <td data-label="Manage" style={{ minWidth: 210 }}>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <input
                      type="number"
                      min="0"
                      value={balanceEdits[account._id] ?? account.balance}
                      onChange={(e) => setBalanceEdits((prev) => ({ ...prev, [account._id]: e.target.value }))}
                      style={{ width: '100px', padding: '6px' }}
                    />
                    <button
                      onClick={() => handleBalanceUpdate(account)}
                      disabled={workingId === account._id}
                      style={{ padding: '6px 8px' }}>
                      {workingId === account._id ? 'Saving...' : 'Set Balance'}
                    </button>
                    <button
                      onClick={() => handleDelete(account._id)}
                      disabled={workingId === account._id}
                      style={{ background: '#d9534f', padding: '6px 8px' }}>
                      {workingId === account._id ? 'Deleting...' : 'Delete'}
                    </button>
                    <button
                      onClick={() => window.location.href = `/user/${account._id}`}
                      style={{ padding: '6px 8px', background: '#0275d8' }}>
                      View
                    </button>
                  </div>
                </td>
                <td data-label="Transactions">
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    {(account.transactions || []).map((tx, idx) => (
                      <li key={`${account._id || account.id}-${idx}`}>
                        {tx.type} ${tx.amount} ({new Date(tx.date).toLocaleString()})
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={loadAccounts} style={{ marginTop: '16px' }}>
        Refresh Accounts
      </button>
    </div>
  );
};

export default AdminDashboard;
