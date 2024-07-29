import React, { useEffect, useState } from "react";
import axios from 'axios';
import SupervisorSidebar from './SupervisorSidebar';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

function SupervisorProjectRequest() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://localhost:3000/api/projects/requests', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const pendingRequests = response.data.filter(request => request.status !== 'accepted' && request.status !== 'rejected');
      setRequests(pendingRequests);
    } catch (error) {
      console.error('Error fetching requests:', error.response?.data || error.message);
    }
  };

  const handleView = (projectId) => {
    navigate(`/SupervisorProReqDetails/${projectId}`);
  };

  return (
    <div className="flex">
      <SupervisorSidebar />
      <div className="flex-grow mt-16 md:mt-4 md:ml-4">
        <div className="container flex flex-col md:flex-row items-center justify-center w-auto h-16 bg-gray-100 mt-4 md:mt-16 md:pr-4 px-4 md:px-0">
          <span className="font-bold mr-2">Department Name:</span>
          <span>Computer Science and IT</span>
        </div>

        <div className="w-full md:w-auto mt-5 mb-10 p-4 md:p-8 rounded-lg bg-gray-100">
          <span className="font-semibold ml-5">Project Requests</span>
          
          <div className="overflow-x-auto mt-4">
            <table className="table-auto w-full border-collapse border border-gray-200 shadow-md rounded-lg">
              <thead className="">
                <tr className="header bg-[#6f5cc3] text-white">
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Student Name</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Program</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-600 py-4">No project requests available.</td>
                  </tr>
                ) : (
                  requests.map((request, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                      <td className="px-4 py-2 border-t border-gray-200">{request.student?.profile?.regNo || request._id}</td>
                      <td className="px-4 py-2 border-t border-gray-200">{request.student?.profile?.fullName || 'N/A'}</td>
                      <td className="px-4 py-2 border-t border-gray-200">{request.projectTitle}</td>
                      <td className="px-4 py-2 border-t border-gray-200">{request.program}</td>
                      <td className="px-4 py-2 border-t border-gray-200 text-center">
                        <button onClick={() => handleView(request._id)} className="text-blue-500 hover:text-blue-700" title="View">
                          <FontAwesomeIcon icon={faEye} className="w-5 h-5"/>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupervisorProjectRequest;
