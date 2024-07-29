import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StudentSideBar from './StudentSideBar';
import { FaCommentDots, FaFolderOpen } from 'react-icons/fa';

const StudentProject = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:3000/api/projects/myprojects', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Projects fetched:', response.data);

        if (Array.isArray(response.data)) {
          // Sort the projects: accepted first, then others
          const sortedProjects = response.data.sort((a, b) => {
            if (a.status === 'accepted' && b.status !== 'accepted') return -1;
            if (a.status !== 'accepted' && b.status === 'accepted') return 1;
            return 0;
          });
          setProjects(sortedProjects);
        } else {
          throw new Error('Unexpected API response structure: projects array not found');
        }
      } catch (error) {
        console.error('Error fetching projects:', error.response?.data || error.message);
      }
    };

    fetchProjects();
  }, []);

  const handleCommentClick = (id) => {
    navigate(`/comments/${id}`);
  };

  const handleProjectDetailsClick = (id) => {
    navigate(`/project/${id}`);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-700 border border-green-300 rounded px-2 py-1';
      case 'rejected':
        return 'bg-red-100 text-red-700 border border-red-300 rounded px-2 py-1';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-300 rounded px-2 py-1';
      default:
        return '';
    }
  };

  return (
    <div className="flex">
      <StudentSideBar />
      <div className="flex-grow mt-16 md:mt-4 md:ml-4">
        <div className="container flex flex-col md:flex-row items-center justify-center w-auto h-16 bg-gray-100 mt-4 md:mt-16 md:pr-4 px-4 md:px-0">
          <span className="font-bold mr-2">Department Name:</span>
          <span>Computer Science and IT</span>
        </div>

        <div className="w-full md:w-auto mt-5 mb-10 p-4 md:p-8 rounded-lg bg-gray-100">
          <div className="overflow-x-auto mt-4">
            <table className="table-auto w-full border-collapse border border-gray-200 shadow-md rounded-lg">
              <thead className="bg-[#6f5cc3] text-white">
                <tr>
                  <th className="px-6 py-4 text-left">S/NO</th>
                  <th className="px-6 py-4 text-left">Project Name</th>
                  <th className="px-6 py-4 text-left">Supervisor</th>
                  <th className="px-6 py-4 text-left">Project Type</th>
                  <th className="px-6 py-4 text-left">Group Members</th>
                  <th className="px-6 py-4 text-left">Degree Type</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.length > 0 ? projects.map((project, index) => (
                  <tr key={project._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <td className="px-6 py-4 border-t border-gray-200">{index + 1}</td>
                    <td className="px-6 py-4 border-t border-gray-200">{project.projectTitle}</td>
                    <td className="px-6 py-4 border-t border-gray-200">{project.supervisor?.profile?.fullName || 'N/A'}</td>
                    <td className="px-6 py-4 border-t border-gray-200">{project.projectType}</td>
                    <td className="px-6 py-4 border-t border-gray-200">
                      {[project.student?.username, ...project.groupMembers.filter(Boolean)].join(", ")}
                    </td>
                    <td className="px-6 py-4 border-t border-gray-200">{project.program}</td>
                    <td className="px-6 py-4 border-t border-gray-200">
                      <span className={getStatusClass(project.status)}>{project.status}</span>
                    </td>
                    <td className="px-6 py-4 border-t border-gray-200">
                      <div className="flex justify-center">
                        <button onClick={() => handleProjectDetailsClick(project._id)} className="text-green-500 hover:text-green-700" title="Open Project">
                          <FaFolderOpen />
                        </button>
                        <button onClick={() => handleCommentClick(project._id)} className="text-blue-500 hover:text-blue-700 ml-2" title="Comment">
                          <FaCommentDots />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="8" className="text-center px-6 py-4 border-t border-gray-200">No projects found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProject;
