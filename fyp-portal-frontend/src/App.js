import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import WelcomeAdmin from './components/WelcomeAdmin';
import AdminDashboard from './components/AdminDashboard';
import AdminDashboardSupervisors from './components/AdminDashboardSupervisors';
import AdminDashboardProject from './components/AdminDashboardProject';
import StudentProjectCreation from './components/StudentProjectCreation';
import StudentProfile from './components/StudentProfile';
import StudentDashboard from './components/StudentDashboard';
import StudentSidebar from './components/StudentSideBar';
import StudentProject from './components/StudentProject';
import StudentChat from './components/StudentChat';
import SupervisorDashboard from './components/SupervisorDashboard';
import SupervisorProfile from './components/SupervisorProfile';
import SupervisorProjectRequest from './components/SupervisorProjectRequest';
import SupervisorProjectsUnderMe from './components/SupervisorProjectsUnderMe';
import SupervisorProReqDetails from './components/SupervisorProReqDetails';
import StudentTasks from './components/StudentTasks';
import StudentMeeting from './components/StudentMeeting';
import AdminProjectEdit from './components/AdminProjectEdit';
import AdminEditSupervisor from './components/AdminEditSupervisor';
import ProjectDetails from './components/ProjectDetails';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ProjectRequestProvider } from './context/ProjectRequestContext';
import AdminDashboardStudent from './components/AdminDashboardStudent';
import Comments from './components/Comments'; // Import Comments component

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ProjectRequestProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<div></div>} />
            <Route path="/WelcomeAdmin" element={<ProtectedRoute role="admin"><WelcomeAdmin /></ProtectedRoute>} />
            <Route path="/AdminDashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/AdminDashboardStudent" element={<ProtectedRoute role="admin"><AdminDashboardStudent /></ProtectedRoute>} />
            <Route path="/AdminDashboardProject" element={<ProtectedRoute role="admin"><AdminDashboardProject /></ProtectedRoute>} />
            <Route path="/AdminDashboardSupervisors" element={<ProtectedRoute role="admin"><AdminDashboardSupervisors /></ProtectedRoute>} />
            <Route path="/StudentProjectCreation" element={<ProtectedRoute role="student"><StudentProjectCreation /></ProtectedRoute>} />
            <Route path="/StudentProfile" element={<ProtectedRoute role="student"><StudentProfile /></ProtectedRoute>} />
            <Route path="/StudentDashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
            <Route path="/StudentSideBar" element={<ProtectedRoute role="student"><StudentSidebar /></ProtectedRoute>} />
            <Route path="/StudentProject" element={<ProtectedRoute role="student"><StudentProject /></ProtectedRoute>} />
            <Route path="/StudentChat" element={<ProtectedRoute role="student"><StudentChat /></ProtectedRoute>} />
            <Route path="/SupervisorDashboard" element={<ProtectedRoute role="supervisor"><SupervisorDashboard /></ProtectedRoute>} />
            <Route path="/SupervisorProfile" element={<ProtectedRoute role="supervisor"><SupervisorProfile /></ProtectedRoute>} />
            <Route path="/SupervisorProjectRequest" element={<ProtectedRoute role="supervisor"><SupervisorProjectRequest /></ProtectedRoute>} />
            <Route path="/SupervisorProjectsUnderMe" element={<ProtectedRoute role="supervisor"><SupervisorProjectsUnderMe /></ProtectedRoute>} />
            <Route path="/SupervisorProReqDetails/:id" element={<ProtectedRoute role="supervisor"><SupervisorProReqDetails /></ProtectedRoute>} />
            <Route path="/StudentTasks" element={<ProtectedRoute role="student"><StudentTasks /></ProtectedRoute>} />
            <Route path="/StudentMeeting" element={<ProtectedRoute role="student"><StudentMeeting /></ProtectedRoute>} />
            <Route path="/AdminProjectEdit/:id" element={<ProtectedRoute role="admin"><AdminProjectEdit /></ProtectedRoute>} />
            <Route path="/AdminEditSupervisor/:id" element={<ProtectedRoute role="admin"><AdminEditSupervisor /></ProtectedRoute>} />
            <Route path="/project/:projectId" element={<ProtectedRoute role={['student', 'supervisor']}><ProjectDetails /></ProtectedRoute>} />
            <Route path="/comments/:projectId" element={<ProtectedRoute role={['admin', 'supervisor', 'student']}><Comments /></ProtectedRoute>} /> {/* Add route for comments */}
          </Routes>
        </ProjectRequestProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
