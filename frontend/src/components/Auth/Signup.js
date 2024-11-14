import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { signup } from '../../services/auth';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await signup(username, password);
      console.log('Signup response:', response);
      login(response.data);
      navigate('/');
    } catch (error) {
      console.error('Full error details:', error);
      const errorMessage = error.response?.data?.message || 'Failed to sign up. Please try again.';
      console.error('Signup failed:', errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSignup} className="auth-form">
        <h2 className="auth-title">Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="auth-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
          required
        />
        <button type="submit" className="auth-button">Sign Up</button>
      </form>
      {error && <p className="auth-message" style={{color: 'red'}}>{error}</p>}
    </div>
  );
};

export default Signup;