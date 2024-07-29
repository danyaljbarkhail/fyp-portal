import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudentSidebar from './StudentSideBar';
import axios from 'axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get('http://localhost:3000/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTasks(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);
  
  console.log(tasks);

  return (
    <div className="flex flex-col md:flex-row">
      <StudentSidebar />
      <div className="flex-grow p-4 md:ml-5 md:mr-12">
        <div className='container flex items-center justify-center w-full h-16 bg-gray-100 mt-16'>
          <span className='font-bold mr-2'>Department Name:</span>
          <span>Computer Science and IT</span>
        </div>
        <div className="w-full md:w-[950px] mx-auto h-auto mt-5 mb-10 rounded-lg bg-gray-100 p-4">
          <span className="font-semibold">Student Portal</span>
          <div className="submenue rounded-full w-full md:w-3/4 mt-2 border-blue-300 border-2 h-12 flex justify-around">
            <Link to='/StudentMeeting' className="flex-1 text-center cursor-pointer mt-2">Meeting</Link>
            <Link to='/StudentTasks' className="flex-1 text-center cursor-pointer mt-2">Tasks</Link>
            <Link to='/StudentChat' className="flex-1 text-center cursor-pointer mt-2">Chat</Link>
          </div>

          <div className='bg-purple-300 h-10 w-full mt-3 rounded-lg flex items-center'>
            <span className='ml-4 font-bold'>Tasks</span>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
            {tasks.map((task, index) => (
              <div key={index} className='text-sm bg-gray-200 p-4 rounded'>
                <div className='font-bold'>Task #{index + 1}</div>
                <div>Title: {task.title}</div>
                <div>Assigned to: {task.assignedTo}</div>
                <div>Due date: {task.dueDate}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
