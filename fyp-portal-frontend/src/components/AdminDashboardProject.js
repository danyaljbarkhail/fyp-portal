import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaCommentDots, FaTrashAlt } from 'react-icons/fa';
import ConfirmationModal from './ConfirmationModal';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/projects');
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleEdit = (id) => {
    try {
      navigate(`/AdminProjectEdit/${id}`);
    } catch (error) {
      console.error('Error navigating to project edit:', error);
    }
  };

  const handleDeleteClick = (id) => {
    setProjectToDelete(id);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/projects/${projectToDelete}`);
      setProjects(projects.filter(project => project._id !== projectToDelete));
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error deleting project. Please try again.');
      setShowModal(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowModal(false);
    setProjectToDelete(null);
  };

  const handleCommentClick = (id) => {
    navigate(`/comments/${id}`);
  };

  const filteredProjects = projects.filter(project =>
    project.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-grow mt-16 md:mt-4 md:ml-4">
        <div className="container flex flex-col md:flex-row items-center justify-center w-auto h-16 bg-gray-100 mt-4 md:mt-16 md:pr-4 px-4 md:px-0">
          <span className="font-bold mr-2">Department Name:</span>
          <span>Computer Science and IT</span>
        </div>

        <div className="w-full md:w-auto mt-5 mb-10 p-4 md:p-8 rounded-lg bg-gray-100">
          <span className="font-semibold ml-5">Total Projects</span>

          {/* SearchBar */}
          <div className="search mx-1 my-1">
            <div className="relative flex w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
              <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 pl-10"
                type="text"
                id="search"
                placeholder="Search projects by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="table-auto w-full border-collapse border border-gray-200 shadow-md rounded-lg">
              <thead className="">
                <tr className="header bg-[#6f5cc3] text-white">
                  <th className="px-4 py-3 text-left">Group #</th>
                  <th className="px-4 py-3 text-left">Project Name</th>
                  <th className="px-4 py-3 text-left">Supervisor</th>
                  <th className="px-4 py-3 text-left">No of Students</th>
                  <th className="px-4 py-3 text-left">Project Area</th>
                  <th className="px-4 py-3 text-left">Progress</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {filteredProjects.map((project, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <td className="px-4 py-2 border-t border-gray-200">{index + 1}</td>
                    <td className="px-4 py-2 border-t border-gray-200">{project.projectTitle}</td>
                    <td className="px-4 py-2 border-t border-gray-200">{project.supervisor?.profile?.fullName || 'N/A'}</td>
                    <td className="px-4 py-2 border-t border-gray-200">{project.groupMembers.length + 1}</td> {/* Incremented by 1 */}
                    <td className="px-4 py-2 border-t border-gray-200">{project.projectType}</td>
                    <td className="px-4 py-2 border-t border-gray-200">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${project.status === 'accepted' ? 'bg-green-100 text-green-700' : project.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 border-t border-gray-200">
                      <div className="flex justify-center items-center space-x-2">
                        {project.status === 'accepted' && (
                          <button onClick={() => handleCommentClick(project._id)} className="text-blue-500 hover:text-blue-700" title="Comment">
                            <FaCommentDots />
                          </button>
                        )}
                        <button onClick={() => handleDeleteClick(project._id)} className="text-red-500 hover:text-red-700" title="Remove">
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmationModal
        show={showModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Confirm Delete"
        message="Are you sure you want to delete this project?"
      />
    </div>
  );
}

export default Projects;
