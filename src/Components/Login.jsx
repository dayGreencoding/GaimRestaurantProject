import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // default role
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!emailOrUsername || !password) {
      setError('Please fill all fields');
      return;
    }

    // Dummy login logic based on role
    if (
      (role === 'admin' && emailOrUsername === 'admin' && password === 'admin123') ||
      (role === 'customer' && emailOrUsername === 'customer@example.com' && password === 'password')
    ) {
      localStorage.setItem('userRole', role);
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/customer-dashboard');
      }
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email or Username</label>
        <input
          type="text"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          placeholder="Enter your email or username"
        />

        <label>Password</label>
        <div className="password-field">
          <input
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <span
            onClick={() => setShowPass(!showPass)}
            style={{ cursor: 'pointer' }}
            aria-label="Toggle password visibility"
          >
            {showPass ? '🙈' : '👁️'}
          </span>
        </div>

        {/* Role toggle buttons */}
        <div style={{ margin: '10px 0' }}>
          <label style={{ marginRight: 10, fontWeight: '600' }}>Login as:</label>

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

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

