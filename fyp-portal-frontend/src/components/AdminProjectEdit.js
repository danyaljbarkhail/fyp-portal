import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';

const AdminProjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectTitle: '',
    description: '',
    proposal: '',
    projectType: '',
    supervisor: '',
    program: '',
    groupMembers: '',
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/admin/projects/${id}`);
        const projectData = response.data;

        // Populate the form fields with existing project data
        setFormData({
          projectTitle: projectData.projectTitle,
          description: projectData.description,
          proposal: projectData.proposal,
          projectType: projectData.projectType,
          supervisor: projectData.supervisor,
          program: projectData.program,
          groupMembers: projectData.groupMembers.join(', '), // Convert array to comma-separated string
        });
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert groupMembers string to array
      const updatedData = {
        ...formData,
        groupMembers: formData.groupMembers.split(',').map((member) => member.trim()),
      };

      await axios.put(`http://localhost:3000/api/admin/projects/${id}`, updatedData);
      navigate('/AdminDashboardProject');
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className='container flex ml-72 mr-12 items-center justify-center w-auto h-16 bg-gray-100 mt-16 '>
        <span className='font-bold'>Department Name: </span>
        <span>Computer Science and IT</span>
      </div>
      <div className='w-[930px] ml-72 mt-5 h-96 mb-36 rounded-lg bg-gray-100'>
        <div className='bg-purple-300 h-10 w-5/3 mt-3 rounded-lg'>
          <span className='ml-4 font-bold'>Project Edit Form</span>
        </div>
        <div className='flex'>
          <form className='bg-white shadow-md rounded-lg p-6 w-full' onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 gap-6 w-5/6'>
              <div className='col-span-1'>
                <div className='mb-4 flex items-center'>
                  <label htmlFor='projectTitle' className='block text-sm font-semibold text-gray-700'>
                    Project Title:
                  </label>
                  <input
                    type='text'
                    id='projectTitle'
                    name='projectTitle'
                    placeholder='Enter Project Title'
                    className='mt-1 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md'
                    value={formData.projectTitle}
                    onChange={handleChange}
                  />
                </div>
                <div className='mb-4 flex items-center'>
                  <label htmlFor='description' className='block text-sm font-semibold text-gray-700 -ml-2'>
                    Description:
                  </label>
                  <textarea
                    id='description'
                    name='description'
                    rows='4'
                    placeholder='Write a brief Description'
                    className='mt-1 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md'
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className='mb-4 flex items-center'>
                  <label htmlFor='proposal' className='block text-sm font-semibold text-gray-700 mr-2'>
                    Proposal:
                  </label>
                  <input
                    type='text'
                    id='proposal'
                    name='proposal'
                    placeholder='No files Uploaded'
                    className='focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md'
                    value={formData.proposal}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className='col-span-1'>
                <div className='mb-4 flex items-center'>
                  <label htmlFor='projectType' className='block text-sm font-semibold text-gray-700 mr-2'>
                    Project Type:
                  </label>
                  <select
                    id='projectType'
                    name='projectType'
                    className='mt-1 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md'
                    value={formData.projectType}
                    onChange={handleChange}
                  >
                    <option value=''>Select</option>
                    <option value='AI'>AI</option>
                    <option value='Frontend'>Frontend</option>
                    <option value='Backend'>Backend</option>
                    <option value='Flutter'>Flutter</option>
                  </select>
                </div>
                <div className='mb-4 flex items-center'>
                  <label htmlFor='supervisor' className='block text-sm font-semibold text-gray-700 mr-2'>
                    Supervisor:
                  </label>
                  <input
                    type='text'
                    id='supervisor'
                    name='supervisor'
                    placeholder='Enter supervisor id'
                    className='mt-1 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md'
                    value={formData.supervisor}
                    onChange={handleChange}
                  />
                </div>
                <div className='mb-4 flex items-center'>
                  <label htmlFor='program' className='block text-sm font-semibold text-gray-700 mr-4'>
                    Program:
                  </label>
                  <select
                    id='program'
                    name='program'
                    className='mt-1 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md'
                    value={formData.program}
                    onChange={handleChange}
                  >
                    <option value=''>Select</option>
                    <option value='BSSE'>BSSE</option>
                    <option value='BSCS'>BSCS</option>
                    <option value='BSAI'>BSAI</option>
                    <option value='BS Networking'>BS Networking</option>
                  </select>
                </div>
                <div className='mb-4 flex items-center'>
                  <label htmlFor='groupMembers' className='block text-sm font-semibold text-gray-700'>
                    Group Members:
                  </label>
                  <input
                    type='text'
                    id='groupMembers'
                    name='groupMembers'
                    placeholder='Enter Group Members IDs'
                    autoComplete='groupMembers'
                    className='mt-1 -ml-3 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md'
                    value={formData.groupMembers}
                    onChange={handleChange}
                  />
                </div>

                <div className='ml-72'>
                  <button
                    type='submit'
                    className='text-white bg-purple-800 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-800 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                  >
                    APPLY
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProjectEdit;
