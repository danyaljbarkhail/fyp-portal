import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import AboutUsModal from './AboutUsModal'; // Import the AboutUsModal component

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !password || !role) {
      setError('Please enter username, password, and select a role.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        username,
        password,
        role,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);

      // Set the user data in the context
      await login({ username, role });

      // Navigate to the appropriate dashboard
      if (role.toLowerCase() === 'admin') {
        navigate('/AdminDashboard');
      } else if (role.toLowerCase() === 'supervisor') {
        navigate('/SupervisorDashboard');
      } else if (role.toLowerCase() === 'student') {
        navigate('/StudentDashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials or unauthorized');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-r from-[#6834a4] to-[#4a2c8a] items-center justify-center text-white p-8">
        <div>
          <h1 className="text-5xl font-bold mb-4">Welcome to FYP Portal</h1>
          <p className="text-lg mb-4">
            The Final Year Project Management System (FYP Portal) was created to simplify and enhance the management of final year projects for students, supervisors, and administrators.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full md:w-1/2 bg-white p-8">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <img src={logo} alt="Logo" className="w-20 h-auto mb-4 mx-auto" />
          <form onSubmit={handleLogin} className="flex flex-col w-full">
            <h2 className="text-3xl font-bold mb-2">User Login</h2>
            <p className="text-gray-500 mb-6">Final Year Project Management System</p>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="text-sm font-bold">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username..."
                  className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-bold">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password..."
                  className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="SelectRole" className="text-sm font-bold">Select Role:</label>
                <select
                  id="SelectRole"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="" disabled>Select a role</option>
                  <option value="admin">Admin</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="student">Student</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-[#6834a4] text-white p-2 px-4 rounded-md font-semibold hover:bg-purple-600 transition-all w-full"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
        <footer className="mt-4">
          <a href="#" onClick={() => setIsModalOpen(true)} className="text-sm text-gray-600 hover:underline">About Us</a>
        </footer>
      </div>

      <AboutUsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Login;
