import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StudentSideBar from './StudentSideBar';
import SupervisorSideBar from './SupervisorSidebar';
import Sidebar from './Sidebar';

const Comments = () => {
  const { projectId } = useParams();
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        console.log(`Fetching comments for project ID: ${projectId}`);
        const response = await axios.get(`http://localhost:3000/api/projects/${projectId}/comments`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Comments fetched:', response.data);
        setComments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching comments:', error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchComments();
  }, [projectId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      console.log('Adding comment:', newComment);
      const response = await axios.post(`http://localhost:3000/api/projects/${projectId}/comments`, {
        comment: newComment
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Comment added:', response.data.comment);
      setComments([response.data.comment, ...comments]); // Add new comment to the top
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error.response?.data || error.message);
    }
  };

  const renderSidebar = () => {
    if (user.role === 'student') {
      return <StudentSideBar />;
    } else if (user.role === 'supervisor') {
      return <SupervisorSideBar />;
    } else {
      return <Sidebar />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {renderSidebar()}
      <div className="flex-grow mt-20 md:mt-16 md:ml-4 p-6">
        <div className='container flex items-center justify-center w-full h-16 bg-gray-100 mt-4'>
          <span className='font-semibold mr-2 text-base'>Department Name:</span>
          <span className='text-base'>Computer Science and IT</span>
        </div>

        <div className="max-w-4xl mx-auto mt-5 mb-10 p-4 md:p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-bold text-center text-white bg-[#6f5cc3] p-4 rounded-t-lg">Project Comments</h2>

          {loading ? (
            <div className="text-center text-base text-gray-600 mt-4">Loading...</div>
          ) : (
            <>
              {user.role !== 'student' && (
                <form className="bg-gray-100 shadow-md p-6 rounded-lg mt-4" onSubmit={handleAddComment}>
                  <div className="mb-4">
                    <label htmlFor="newComment" className="block text-sm font-medium text-gray-700">Add a Comment:</label>
                    <textarea
                      id="newComment"
                      name="newComment"
                      rows="4"
                      placeholder='Write your comment here...'
                      className="mt-1 bg-white block w-full text-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-[#6f5cc3] hover:bg-[#58448c] text-white font-medium py-2 px-4 rounded-md transition duration-200"
                    >
                      Add Comment
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-4 mt-6">
                {comments.length === 0 ? (
                  <div className="text-center text-base text-gray-600">No comments added yet!</div>
                ) : (
                  comments.map((comment, index) => (
                    <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm border border-gray-200">
                      <p className="text-sm text-gray-800">{comment.comment}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {comment.userId?.profile?.fullName} ({comment.userId?.role})
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(comment.timestamp).toLocaleString()}</p>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
