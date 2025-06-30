import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [role, setRole] = useState('customer'); // default role
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!email || !password || !confirm) {
      setError('All fields are required');
      return;
    }

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    // Dummy success logic (replace with real API call)
    alert(`Account created for ${role}: ${email}`);
    navigate('/login');
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSignup}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <label>Password</label>
        <div className="password-field">
          <input
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create password"
          />
          <span
            onClick={() => setShowPass(!showPass)}
            style={{ cursor: 'pointer' }}
            aria-label="Toggle password visibility"
          >
            {showPass ? '🙈' : '👁️'}
          </span>
        </div>

        <label>Confirm Password</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Repeat password"
        />

        {/* Role toggle buttons */}
        <div style={{ margin: '10px 0' }}>
          <label style={{ marginRight: 10, fontWeight: '600' }}>Register as:</label>

          <button
            type="button"
            onClick={() => setRole('customer')}
            style={{
              padding: '8px 15px',
              marginRight: 10,
              backgroundColor: role === 'customer' ? '#2c7be5' : '#eee',
              color: role === 'customer' ? 'white' : '#333',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            Customer
          </button>

          <button
            type="button"
            onClick={() => setRole('admin')}
            style={{
              padding: '8px 15px',
              backgroundColor: role === 'admin' ? '#2c7be5' : '#eee',
              color: role === 'admin' ? 'white' : '#333',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            Admin
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signup;
