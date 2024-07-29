import React, { useEffect, useState } from 'react';
import { Doughnut, PolarArea } from 'react-chartjs-2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import 'chart.js/auto';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalSupervisors, setTotalSupervisors] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [studentsWithProjects, setStudentsWithProjects] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsResponse = await axios.get('http://localhost:3000/api/admin/projects');
        const studentsResponse = await axios.get('http://localhost:3000/api/admin/total-students');
        const supervisorsResponse = await axios.get('http://localhost:3000/api/admin/total-supervisors');
        const totalProjectsResponse = await axios.get('http://localhost:3000/api/admin/total-projects');
        const studentsWithProjectsResponse = await axios.get('http://localhost:3000/api/admin/students-with-projects');

        setProjects(projectsResponse.data);
        setTotalStudents(studentsResponse.data.totalStudents);
        setTotalSupervisors(supervisorsResponse.data.totalSupervisors);
        setTotalProjects(totalProjectsResponse.data.totalProjects);
        setStudentsWithProjects(studentsWithProjectsResponse.data.studentsWithProjects);
      } catch (error) {
        console.error('Error fetching data:', error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);

  const projectStatusData = {
    labels: ['Accepted', 'Rejected', 'Pending'],
    datasets: [
      {
        label: 'Projects Status',
        data: [
          projects.filter((project) => project.status === 'accepted').length,
          projects.filter((project) => project.status === 'rejected').length,
          projects.filter((project) => project.status === 'pending').length,
        ],
        backgroundColor: ['#4CAF50', '#F44336', '#FF9800'],
        borderWidth: 1,
      },
    ],
  };

  const studentsWithProjectsData = {
    labels: ['Students with Projects', 'Students without Projects'],
    datasets: [
      {
        label: 'Students with Projects',
        data: [studentsWithProjects, totalStudents - studentsWithProjects],
        backgroundColor: ['#2196F3', '#E0E0E0'],
      },
    ],
  };

  const recentProjects = projects.slice(0, 5);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-6">
        <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div
            className="bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer"
            onClick={() => navigate('/AdminDashboardProject')}
          >
            <h2 className="text-xl font-semibold">Total Projects</h2>
            <p className="text-4xl font-bold text-purple-600">{totalProjects}</p>
          </div>
          <div
            className="bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer"
            onClick={() => navigate('/AdminDashboardStudent')}
          >
            <h2 className="text-xl font-semibold">Total Students</h2>
            <p className="text-4xl font-bold text-blue-600">{totalStudents}</p>
          </div>
          <div
            className="bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer"
            onClick={() => navigate('/AdminDashboardSupervisors')}
          >
            <h2 className="text-xl font-semibold">Total Supervisors</h2>
            <p className="text-4xl font-bold text-green-600">{totalSupervisors}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Project Status</h2>
            <PolarArea data={projectStatusData} />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Students with Projects</h2>
            <Doughnut data={studentsWithProjectsData} />
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-[#6f5cc3] text-white">
                  <th className="px-4 py-2 text-left">Group #</th>
                  <th className="px-4 py-2 text-left">Project Name</th>
                  <th className="px-4 py-2 text-left">Supervisor</th>
                  <th className="px-4 py-2 text-left">No of Students</th>
                  <th className="px-4 py-2 text-left">Project Area</th>
                  <th className="px-4 py-2 text-left">Progress</th>
                </tr>
              </thead>
              <tbody>
                {recentProjects.map((project, index) => (
                  <tr key={project._id} className={index % 2 === 0 ? "bg-purple-100" : "bg-white"}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{project.projectTitle}</td>
                    <td className="px-4 py-2">{project.supervisor?.profile?.fullName || 'N/A'}</td>
                    <td className="px-4 py-2">{project.groupMembers.length + 1}</td>
                    <td className="px-4 py-2">{project.projectType}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`text-xs font-semibold inline-block py-1 px-2 rounded text-white ${
                          project.status === 'accepted' ? 'bg-green-500' : project.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
