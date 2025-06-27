import React, { useState } from 'react';
import './LoginDropdown.css';

function LoginDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [role, setRole] = useState(null);
  const [formType, setFormType] = useState('login'); // or 'signup'

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setRole(null); // Reset role on toggle
  };

  return (
    <div className="login-dropdown">
      <button className="login-btn" onClick={toggleDropdown}>
        Login/Register
      </button>

      {showDropdown && (
        <div className="dropdown-menu">
          {!role ? (
            <>
              <button onClick={() => setRole('admin')}>Admin Login</button>
              <button onClick={() => setRole('customer')}>Customer Login</button>
            </>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`${formType.toUpperCase()} as ${role}`);
              }}
            >
              <h4>{role === 'admin' ? 'Admin' : 'Customer'} {formType === 'login' ? 'Login' : 'Signup'}</h4>
              <input type="text" placeholder="Username" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">{formType === 'login' ? 'Login' : 'Signup'}</button>
              <div className="form-footer">
                {formType === 'login' ? (
                  <span onClick={() => setFormType('signup')}>New? Signup</span>
                ) : (
                  <span onClick={() => setFormType('login')}>Have an account? Login</span>
                )}
                <span onClick={() => { setRole(null); setFormType('login'); }}>← Back</span>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default LoginDropdown;