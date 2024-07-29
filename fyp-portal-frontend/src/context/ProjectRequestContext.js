import React, { createContext, useContext, useState } from 'react';

const ProjectRequestContext = createContext();

export const ProjectRequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);

  return (
    <ProjectRequestContext.Provider value={{ requests, setRequests }}>
      {children}
    </ProjectRequestContext.Provider>
  );
};

export const useProjectRequest = () => useContext(ProjectRequestContext);
