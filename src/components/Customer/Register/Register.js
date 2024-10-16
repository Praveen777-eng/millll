import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Register.css';
import DotSpinner from '../DotSpinner/DotSpinner';
 
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    mobile_number: '',
    alternate_number: '',
    password: '',
    confirm_password: '',
    address: '',
  });
 
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }
 
    setLoading(true);
    try {
      const response = await fetch('https://prasad-gz5p.onrender.com/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
 
      const responseData = await response.text();
      console.log('Response:', responseData);
 
      if (!response.ok) {
        throw new Error(responseData || 'Registration failed');
      }
 
      const data = JSON.parse(responseData);
      setSuccess(true);
      setFormData({
        username: '',
        mobile_number: '',
        alternate_number: '',
        password: '',
        confirm_password: '',
        address: '',
      });
      setError(null);
      navigate('/customer-home');
 
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="register-page007">
    {loading ? (
          <DotSpinner />
        ) : (
      <div className="container007">
        <h1 className="heading007">User Registration</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>Registration successful!</p>}
        <form className="form007" onSubmit={handleSubmit}>
          <input
            className="input007"
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            className="input007"
            type="text"
            name="mobile_number"
            placeholder="Mobile Number"
            value={formData.mobile_number}
            onChange={handleChange}
            required
          />
          <input
            className="input007"
            type="text"
            name="alternate_number"
            placeholder="Alternate Number"
            value={formData.alternate_number}
            onChange={handleChange}
          />
          <div className="password-container">
            <input
              className="input007"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="button" className="eye-button" onClick={() => setShowPassword(!showPassword)}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          </div>
          <div className="password-container">
            <input
              className="input007"
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirm_password"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />
            <button type="button" className="eye-button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
            </button>
          </div>
          <textarea
            className="input007"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-button007" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p>
          Already have an account?
          <button onClick={() => navigate('/login')} className="login-link007">
            Login here
          </button>
        </p>
      </div>
    )}
    </div>
  );
};
 
export default Register;