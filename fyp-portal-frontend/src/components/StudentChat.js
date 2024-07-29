import React from 'react';
import StudentSideBar from "./StudentSideBar";
import { Link } from 'react-router-dom';

function StudentChat() {
  return (
    <div className="flex flex-col md:flex-row">
      <StudentSideBar />
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
            <span className='ml-4 font-bold'>Chat</span>
          </div>

          <div className='mt-4'>
            <div className='text-lg bg-gray-200 p-4 rounded font-semibold'>
              Click on the link below to join WhatsApp group for project discussion
            </div>
            <div className='text-blue-800 text-lg bg-gray-200 p-4 rounded font-semibold mt-2'>
              <a href="https://chat.whatsapp.com/group" target="_blank" rel="noopener noreferrer">
                https://chat.whatsapp.com/group
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentChat;
