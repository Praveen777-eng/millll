import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './AdminLogin.css';

const AdminLogin = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    mobile_number: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch('https://prasad-gz5p.onrender.com/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const { token } = await response.json();
      localStorage.setItem('authToken', token);
      setError(null);
      onLoginSuccess(); // Notify parent component about successful login
      navigate('/Admin-Home'); // Redirect to Admin Home
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className='mainContainer010'>
      <div className="login-page010">
        <div className="container010">
          <h1 className="heading010">Admin Login</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit} className="form010">
            <input
              type="text"
              name="mobile_number"
              placeholder="Mobile Number"
              value={formData.mobile_number}
              onChange={handleChange}
              required
              className="input010"
            />
            <div className="password-container010">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input010"
              />
              <span
                className="password-toggle010"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className='eye' />
              </span>
            </div>
            <button type="submit" className="login-button010" disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
          <p>
            Don't have an account?
            <button
              onClick={() => navigate('/Admin-Register')}
              className="register-button010"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
