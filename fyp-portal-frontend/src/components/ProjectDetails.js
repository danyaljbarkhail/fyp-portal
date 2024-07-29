import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StudentSideBar from './StudentSideBar';
import SupervisorSideBar from './SupervisorSidebar';
import { useAuth } from '../context/AuthContext';
import Chat from './Chat';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('meetings');

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const projectResponse = await axios.get(`http://localhost:3000/api/projects/requests/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const meetingsResponse = await axios.get(`http://localhost:3000/api/meetings/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const tasksResponse = await axios.get(`http://localhost:3000/api/tasks/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProject(projectResponse.data);
        setMeetings(meetingsResponse.data);
        setTasks(tasksResponse.data);
      } catch (error) {
        console.error('Error fetching project details:', error.response?.data || error.message);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const handleMeetingCreate = async (e) => {
    e.preventDefault();
    const { meetingType, time, location, date } = e.target.elements;

    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:3000/api/meetings`, {
        meetingType: meetingType.value,
        time: time.value,
        location: location.value,
        date: date.value,
        projectId: projectId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Refresh meetings list
      const meetingsResponse = await axios.get(`http://localhost:3000/api/meetings/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMeetings(meetingsResponse.data);
    } catch (error) {
      console.error('Error creating meeting:', error.response?.data || error.message);
    }
  };

  const handleTaskCreate = async (e) => {
    e.preventDefault();
    const { title, assignedTo, dueDate } = e.target.elements;

    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:3000/api/tasks`, {
        title: title.value,
        assignedTo: assignedTo.value,
        dueDate: dueDate.value,
        projectId: projectId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Refresh tasks list
      const tasksResponse = await axios.get(`http://localhost:3000/api/tasks/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(tasksResponse.data);
    } catch (error) {
      console.error('Error creating task:', error.response?.data || error.message);
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  const Sidebar = user.role === 'supervisor' ? SupervisorSideBar : StudentSideBar;

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-grow mt-10 md:mt-4 md:ml-4">
        <div className="container flex items-center justify-center w-full h-16 bg-gray-100 mt-16">
          <span className="font-bold mr-2 text-lg">Department Name:</span>
          <span className="text-lg">Computer Science and IT</span>
        </div>
        <div className="w-full md:w-[930px] mx-auto mt-5 mb-36 p-4 md:p-8 rounded-lg bg-gray-100">
          <div className="bg-purple-300 h-10 w-full mt-3 rounded-lg flex items-center">
            <span className="ml-4 font-bold text-lg">{project.projectTitle}</span>
          </div>
          <p className="mb-4 mt-4"><strong>Supervisor:</strong> {project.supervisor?.profile?.fullName || 'N/A'}</p>
          <p className="mb-4"><strong>Group Members:</strong> {project.groupMembers.concat(project.student?.profile?.fullName).join(', ')}</p>
          
          <div className="tabs">
            <button className={activeTab === 'meetings' ? 'active' : ''} onClick={() => setActiveTab('meetings')}>Meetings</button>
            <button className={activeTab === 'tasks' ? 'active' : ''} onClick={() => setActiveTab('tasks')}>Tasks</button>
            <button className={activeTab === 'chat' ? 'active' : ''} onClick={() => setActiveTab('chat')}>Chat</button>
          </div>

          {activeTab === 'meetings' && (
            <>
              {user.role === 'supervisor' && (
                <form onSubmit={handleMeetingCreate} className="mb-4 flex flex-wrap items-center">
                  <input type="text" name="meetingType" placeholder="Meeting Type" className="mr-2 p-2 border rounded mb-2" required />
                  <input type="time" name="time" className="mr-2 p-2 border rounded mb-2" required />
                  <input type="date" name="date" className="mr-2 p-2 border rounded mb-2" required />
                  <input type="text" name="location" placeholder="Location" className="mr-2 p-2 border rounded mb-2" required />
                  <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded mb-2">Create Meeting</button>
                </form>
              )}
              {meetings.length === 0 ? (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
                  <p className="font-bold">No meetings scheduled!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {meetings.map(meeting => (
                    <div key={meeting._id} className="bg-white p-4 rounded shadow">
                      <h3 className="font-bold">{meeting.meetingType}</h3>
                      <p>{meeting.date} at {meeting.time}</p>
                      <p>{meeting.location}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'tasks' && (
            <>
              {user.role === 'supervisor' && (
                <form onSubmit={handleTaskCreate} className="mb-4 flex flex-wrap items-center">
                  <input type="text" name="title" placeholder="Task Title" className="mr-2 p-2 border rounded mb-2" required />
                  <input type="date" name="dueDate" className="mr-2 p-2 border rounded mb-2" required />
                  <input type="text" name="assignedTo" placeholder="Assigned To" className="mr-2 p-2 border rounded mb-2" required />
                  <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded mb-2">Create Task</button>
                </form>
              )}
              {tasks.length === 0 ? (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
                  <p className="font-bold">No tasks assigned!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {tasks.map(task => (
                    <div key={task._id} className="bg-white p-4 rounded shadow">
                      <h3 className="font-bold">{task.title}</h3>
                      <p>Due: {task.dueDate}</p>
                      <p>Assigned to: {task.assignedTo}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'chat' && <Chat projectId={projectId} />}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
