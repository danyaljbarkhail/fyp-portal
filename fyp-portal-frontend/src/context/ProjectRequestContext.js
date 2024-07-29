import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProjectRequestContext = createContext();

export const ProjectRequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch project requests from the backend
    const fetchRequests = async () => {
      try {
        const response = await axios.get('https://fyp-portal-server.vercel.app/api/projects/requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching project requests:', error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <ProjectRequestContext.Provider value={{ requests, setRequests }}>
      {children}
    </ProjectRequestContext.Provider>
  );
};

export const useProjectRequest = () => useContext(ProjectRequestContext);
