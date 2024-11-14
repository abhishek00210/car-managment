import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { login } from '../../services/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await login(username, password);
      authLogin(response.data);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response) {
        switch (error.response.status) {
          case 400:
            if (error.response.data.message === 'Email not verified') {
              setError('Please verify your email before logging in.');
            } else {
              setError('Invalid username or password. Please try again.');
            }
            break;
          case 500:
            setError('Server error. Please try again later.');
            break;
          default:
            setError('An error occurred. Please try again.');
        }
      } else {
        setError('Network error. Please check your internet connection.');
      }
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-title">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="auth-input"
        />
        <button type="submit" className="auth-button">Login</button>
        {error && <p className="auth-message error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;