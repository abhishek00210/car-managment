import api from './api';

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    return response;
  } catch (error) {
    console.error('Error in login service:', error);
    throw error;
  }
};

export const signup = async (username, password) => {
  try {
    const response = await api.post('/auth/signup', { username, password });
    return response;
  } catch (error) {
    console.error('Error in signup service:', error);
    throw error;
  }
};