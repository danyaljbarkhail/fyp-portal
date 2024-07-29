import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StudentSidebar from './StudentSideBar';

const Meeting = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://localhost:3000/api/meetings/meetings', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMeetings(response.data); // Assuming your API returns meetings in the structure { meetings: [...] }
    } catch (error) {
      console.error('Error fetching meetings:', error.response?.data || error.message);
    }
  };

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
            <span className='ml-4 font-bold'>Meetings</span>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
            {meetings.map((meeting, index) => (
              <div key={index} className='text-sm bg-gray-200 p-4 rounded'>
                <div className='font-bold'>{meeting.meetingType}</div>
                <div>Time: {meeting.time}</div>
                <div>Location: {meeting.location}</div>
                <div>Due date: {meeting.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Meeting;
