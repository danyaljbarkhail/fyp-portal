import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaTrashAlt } from 'react-icons/fa';
import ConfirmationModal from './ConfirmationModal';

function AdminDashboardStudent() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/admin/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleDeleteClick = (id) => {
    setStudentToDelete(id);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/students/${studentToDelete}`);
      setStudents(students.filter(student => student._id !== studentToDelete));
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting student:", error);
      alert('Error deleting student. Please try again.');
      setShowModal(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowModal(false);
    setStudentToDelete(null);
  };

  const filteredStudents = students.filter(student =>
    student.profile && student.profile.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar className="md:w-1/4" />

      <div className="flex-grow mt-16 md:mt-4 md:ml-4">
        <div className='container flex items-center justify-center w-auto h-16 bg-gray-100 mt-4 md:mt-16 md:pr-4 px-4 md:px-0'>
          <span className='font-bold mr-2'>Department Name:</span>
          <span>Computer Science and IT</span>
        </div>

        <div className="w-full md:w-auto mx-auto mt-5 mb-10 p-4 md:p-8 rounded-lg bg-gray-100">
          <span className="font-semibold ml-5">Students</span>

          <div className="search mx-1 my-2"> {/* Adjusted margin */}
            <div className="relative flex w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
              <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 pl-10"
                type="text"
                id="search"
                placeholder="Search students..."
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
                  <th className="px-4 py-3 text-left">Batch No</th>
                  <th className="px-4 py-3 text-left">Reg No</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Section</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Program</th>
                  <th className="px-4 py-3 text-left">Batch Stream</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {filteredStudents.map((student, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <td className="px-4 py-2 border-t border-gray-200">{index + 1}</td>
                    <td className="px-4 py-2 border-t border-gray-200">{student.profile?.batchNo || 'N/A'}</td>
                    <td className="px-4 py-2 border-t border-gray-200">{student.profile?.regNo || 'N/A'}</td>
                    <td className="px-4 py-2 border-t border-gray-200">{student.profile?.fullName || 'N/A'}</td>
                    <td className="px-4 py-2 border-t border-gray-200">{student.profile?.section || 'N/A'}</td>
                    <td className="px-4 py-2 border-t border-gray-200">{student.profile?.email || 'N/A'}</td>
                    <td className="px-4 py-2 border-t border-gray-200">{student.profile?.program || 'N/A'}</td>
                    <td className="px-4 py-2 border-t border-gray-200">{student.profile?.batchStream || 'N/A'}</td>
                    <td className="px-4 py-2 border-t border-gray-200">
                      <div className="flex justify-center">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteClick(student._id)}
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
        message="Are you sure you want to delete this student?"
      />
    </div>
  );
}

export default AdminDashboardStudent;
