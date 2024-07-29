import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SupervisorSidebar from './SupervisorSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

function SupervisorProReqDetails() {
  const { id } = useParams();
  const [projectRequest, setProjectRequest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectRequest = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(`http://localhost:3000/api/projects/requests/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Fetched Project Request:', response.data);
        setProjectRequest(response.data);
      } catch (error) {
        console.error('Error fetching project request details:', error.response?.data || error.message);
      }
    };

    fetchProjectRequest();
  }, [id]);

  const handleAccept = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.put(`http://localhost:3000/api/projects/requests/${projectId}/accept`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response.data.message);
      navigate('/SupervisorProjectsUnderMe');
    } catch (error) {
      console.error('Error accepting request:', error.response?.data || error.message);
    }
  };

  const handleReject = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.put(`http://localhost:3000/api/projects/requests/${projectId}/reject`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response.data.message);
      navigate('/SupervisorProjectsUnderMe');
    } catch (error) {
      console.error('Error rejecting request:', error.response?.data || error.message);
    }
  };

  if (!projectRequest) {
    return <div>Loading...</div>;
  }

  const downloadProposal = () => {
    if (projectRequest.proposalUrl) {
      window.open(projectRequest.proposalUrl, '_blank');
    } else {
      alert('No proposal URL found');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <SupervisorSidebar />

      <div className="flex-grow mt-16 md:mt-4 md:ml-4 p-6">
        <div className='container flex items-center justify-center w-full h-16 bg-gray-100 mt-16'>
          <span className='font-bold mr-2 text-lg'>Department Name:</span>
          <span className='text-lg'>Computer Science and IT</span>
        </div>

        <div className="max-w-4xl mx-auto mt-5 mb-36 p-6 md:p-8 bg-white shadow-md">
          <h2 className="text-2xl font-bold text-center text-white bg-[#6f5cc3] p-4">Project Request Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="col-span-1">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Student Username:</label>
                <div className="mt-1 bg-gray-100 block w-full sm:text-sm p-2">
                  {projectRequest.student.username}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Project Title:</label>
                <div className="mt-1 bg-gray-100 block w-full sm:text-sm p-2">
                  {projectRequest.projectTitle}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Project Type:</label>
                <div className="mt-1 bg-gray-100 block w-full sm:text-sm p-2">
                  {projectRequest.projectType}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Project Proposal:</label>
                <div className="mt-1 bg-gray-100 flex items-center justify-between w-full sm:text-sm p-2">
                  <span>Download Proposal</span>
                  <button
                    onClick={downloadProposal}
                    className="text-[#6f5cc3] hover:text-[#58448c]"
                  >
                    <FontAwesomeIcon icon={faDownload} className="w-5 h-5"/>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Group Members:</label>
                <div className="mt-1 bg-gray-100 block w-full sm:text-sm p-2">
                  {projectRequest.groupMembers.join(", ")}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Project Description:</label>
                <div className="mt-1 bg-gray-100 block w-full sm:text-sm p-2">
                  {projectRequest.description}
                </div>
              </div>

              <div className="flex space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => handleAccept(projectRequest._id)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  Accept
                </button>
                <button
                  type="button"
                  onClick={() => handleReject(projectRequest._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupervisorProReqDetails;
