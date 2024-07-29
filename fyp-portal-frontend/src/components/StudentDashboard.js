import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StudentSideBar from './StudentSideBar';
import { FaUserEdit, FaProjectDiagram, FaListUl, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';

const StudentDashboard = () => {
  const [profile, setProfile] = useState({ fullName: '' });
  const [projects, setProjects] = useState([]);
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileAndProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const profileResponse = await axios.get('http://localhost:3000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const projectsResponse = await axios.get('http://localhost:3000/api/projects/myprojects', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProfile(profileResponse.data.user || {});
        setProjects(projectsResponse.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchProfileAndProjects();
  }, []);

  useEffect(() => {
    // Fetch a motivational quote
    const fetchQuote = async () => {
      try {
        const response = await axios.get('https://api.quotable.io/random');
        setQuote(response.data.content);
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    fetchQuote();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getProjectStats = () => {
    const acceptedProjects = projects.filter(project => project.status === 'accepted').length;
    const pendingProjects = projects.filter(project => project.status === 'pending').length;
    return { acceptedProjects, pendingProjects };
  };

  const { acceptedProjects, pendingProjects } = getProjectStats();

  return (
    <div className="flex flex-col md:flex-row">
      <StudentSideBar />

      <div className="flex flex-col flex-grow mt-10 md:mt-4 md:ml-4">
        <div className="container flex flex-col md:flex-row items-center justify-center w-auto h-16 bg-gray-100 mt-4 md:mt-16 md:pr-4 px-4 md:px-0">
          <span className="font-bold mr-2 text-lg">Department Name:</span>
          <span className="text-lg">Computer Science and IT</span>
        </div>

        <div className="w-full md:w-[930px] mx-auto mt-5 mb-36 p-4 md:p-8 rounded-lg bg-gray-100">
          <div className="ml-0 md:ml-12 mt-4">
            <h1 className="font-bold text-2xl pt-6 mb-8">{getGreeting()}, {profile.fullName}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-white shadow-md rounded-lg">
                <div className="flex items-center">
                  <FaUserEdit className="text-[#6f5cc3] text-3xl mr-4" />
                  <div>
                    <span className="font-bold text-xl">Step 1:</span>
                    <br />
                    <span className="font-semibold text-lg">Complete Your Profile</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white shadow-md rounded-lg">
                <div className="flex items-center">
                  <FaProjectDiagram className="text-[#6f5cc3] text-3xl mr-4" />
                  <div>
                    <span className="font-bold text-xl">Step 2:</span>
                    <br />
                    <span className="font-semibold text-lg">Create New Project</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white shadow-md rounded-lg">
                <div className="flex items-center">
                  <FaListUl className="text-[#6f5cc3] text-3xl mr-4" />
                  <div>
                    <span className="font-bold text-xl">Step 3:</span>
                    <br />
                    <span className="font-semibold text-lg">Follow Up Your Project</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white shadow-md rounded-lg mb-6">
              <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-500 text-3xl mr-4" />
                  <div>
                    <span className="font-semibold text-lg">Accepted Projects:</span>
                    <br />
                    <span className="font-semibold text-2xl">{acceptedProjects}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaHourglassHalf className="text-yellow-500 text-3xl mr-4" />
                  <div>
                    <span className="font-semibold text-lg">Pending Projects:</span>
                    <br />
                    <span className="font-semibold text-2xl">{pendingProjects}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center p-4 bg-white shadow-md rounded-lg mb-6">
              <h2 className="font-bold text-xl mb-4">Motivational Quote:</h2>
              <p className="italic text-lg text-[#6f5cc3]">"{quote}"</p>
            </div>

            <div className="flex justify-center space-x-4 mb-6">
              <Link to='/StudentProfile'>
                <button
                  type="submit"
                  className="bg-[#6532A5] text-white py-2 px-6 rounded-md font-semibold hover:bg-[#7c46d3] transition duration-300"
                >
                  Complete Profile
                </button>
              </Link>
              <Link to='/StudentProjectCreation'>
                <button
                  type="submit"
                  className="bg-[#6532A5] text-white py-2 px-6 rounded-md font-semibold hover:bg-[#7c46d3] transition duration-300"
                >
                  Create Project
                </button>
              </Link>
              <Link to='/StudentProject'>
                <button
                  type="submit"
                  className="bg-[#6532A5] text-white py-2 px-6 rounded-md font-semibold hover:bg-[#7c46d3] transition duration-300"
                >
                  View Projects
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
