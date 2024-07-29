import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaTrashAlt } from 'react-icons/fa';
import ConfirmationModal from './ConfirmationModal';

function AdminDashboardSupervisors() {
  const [supervisors, setSupervisors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [supervisorToDelete, setSupervisorToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:3000/api/supervisors", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSupervisors(response.data);
      } catch (error) {
        console.error("Error fetching supervisors:", error);
      }
    };

    fetchSupervisors();
  }, []);

  const handleDeleteClick = (id) => {
    setSupervisorToDelete(id);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/supervisors/${supervisorToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSupervisors(supervisors.filter(supervisor => supervisor._id !== supervisorToDelete));
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting supervisor:', error);
      alert('Error deleting supervisor. Please try again.');
      setShowModal(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowModal(false);
    setSupervisorToDelete(null);
  };

  const filteredSupervisors = supervisors.filter(supervisor =>
    supervisor.profile && supervisor.profile.fullName && supervisor.profile.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar className="md:w-1/4" />

      <div className="flex-grow mt-16 md:mt-4 md:ml-4">
        <div className="container flex flex-col md:flex-row items-center justify-center w-auto h-16 bg-gray-100 mt-4 md:mt-16 md:pr-4 px-4 md:px-0">
          <span className="font-bold mr-2">Department Name:</span>
          <span>Computer Science and IT</span>
        </div>

        <div className="w-full md:w-auto mx-auto mt-5 mb-10 p-4 md:p-8 rounded-lg bg-gray-100">
          <span className="font-semibold ml-5">Supervisors</span>

          {/* SearchBar */}
          <div className="search mx-1 my-1">
            <div className="relative flex w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
              <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 pl-10"
                type="text"
                id="search"
                placeholder="Search something.."
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
                  <th className="px-4 py-3 text-left">Serial No</th>
                  <th className="px-4 py-3 text-left">Supervisor Name</th>
                  <th className="px-4 py-3 text-left">Designation</th>
                  <th className="px-4 py-3 text-left">Interested Area</th>
                  <th className="px-4 py-3 text-left">Project Type</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {filteredSupervisors.map((supervisor, index) => (
                  <tr key={supervisor._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <td className="px-4 py-2 border-t border-gray-200">{index + 1}</td>
                    <td className="px-4 py-2 border-t border-gray-200">{supervisor.profile && supervisor.profile.fullName}</td>
                    <td className="px-4 py-2 border-t border-gray-200">{supervisor.profile && supervisor.profile.designation}</td>
                    <td className="px-4 py-2 border-t border-gray-200">{supervisor.profile && supervisor.profile.interestedArea}</td>
                    <td className="px-4 py-2 border-t border-gray-200">{supervisor.profile && supervisor.profile.projectType}</td>
                    <td className="px-4 py-2 border-t border-gray-200">
                      <div className="flex justify-center">
                        <button
                          className="text-red-500 hover:text-red-700 ml-2"
                          onClick={() => handleDeleteClick(supervisor._id)}
                          title="Remove"
                        >
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
        message="Are you sure you want to delete this supervisor?"
      />
    </div>
  );
}

export default AdminDashboardSupervisors;
