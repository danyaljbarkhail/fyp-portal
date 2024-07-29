import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode'; // Import jwt-decode

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  });

  const login = async ({ username, password, role }) => {
    try {
      const response = await axios.post('https://fyp-portal-server.vercel.app/api/auth/login', {
        username,
        password,
        role,
      });

      const { token } = response.data;
      const decoded = jwtDecode(token);
      setUser(decoded);
      localStorage.setItem('user', JSON.stringify(decoded));
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid credentials or unauthorized');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.post('https://fyp-portal-server.vercel.app/api/auth/verify', { token })
        .then(response => {
          const decoded = jwtDecode(token);
          setUser(decoded);
        })
        .catch(error => {
          console.error('Token verification error:', error);
          logout();
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
