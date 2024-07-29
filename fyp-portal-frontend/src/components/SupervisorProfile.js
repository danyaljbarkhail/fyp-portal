import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SupervisorSidebar from './SupervisorSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const SupervisorProfile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phoneNo: '',
    designation: '',
    interestedArea: '',
    projectType: '',
    program: '',
    levelOfStudies: '',
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const user = response.data.user || {};

        setProfile({
          fullName: user.fullName || '',
          email: user.email || '',
          phoneNo: user.phoneNo || '',
          designation: user.designation || '',
          interestedArea: user.interestedArea || '',
          projectType: user.projectType || '',
          program: user.program || '',
          levelOfStudies: user.levelOfStudies || '',
        });

        if (Object.keys(user).length === 0) {
          setEditing(true);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:3000/api/auth/profile', profile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <SupervisorSidebar />

      <div className="flex-grow mt-16 md:mt-4 md:ml-4 p-6">
        <div className='container flex items-center justify-center w-full h-16 bg-gray-100 mt-16'>
          <span className='font-bold mr-2 text-lg'>Department Name:</span>
          <span className='text-lg'>Computer Science and IT</span>
        </div>

        <div className="max-w-4xl mx-auto mt-5 mb-36 p-6 md:p-8 bg-white shadow-md">
          <h2 className="text-2xl font-bold text-center text-white bg-[#6f5cc3] p-4">My Profile - Supervisor</h2>

          {editing ? (
            <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1">
                  <div className="mb-4">
                    <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700">Full Name:</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleChange}
                      className="mt-1 bg-gray-100 block w-full sm:text-sm p-2"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="mt-1 bg-gray-100 block w-full sm:text-sm p-2"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phoneNo" className="block text-sm font-semibold text-gray-700">Phone No:</label>
                    <input
                      type="tel"
                      id="phoneNo"
                      name="phoneNo"
                      value={profile.phoneNo}
                      onChange={handleChange}
                      className="mt-1 bg-gray-100 block w-full sm:text-sm p-2"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="levelOfStudies" className="block text-sm font-semibold text-gray-700">Level of Studies:</label>
                    <input
                      type="text"
                      id="levelOfStudies"
                      name="levelOfStudies"
                      value={profile.levelOfStudies}
                      onChange={handleChange}
                      className="mt-1 bg-gray-100 block w-full sm:text-sm p-2"
                      placeholder="Enter your level of studies"
                      required
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="mb-4">
                    <label htmlFor="designation" className="block text-sm font-semibold text-gray-700">Designation:</label>
                    <input
                      type="text"
                      id="designation"
                      name="designation"
                      value={profile.designation}
                      onChange={handleChange}
                      className="mt-1 bg-gray-100 block w-full sm:text-sm p-2"
                      placeholder="Enter your designation"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="interestedArea" className="block text-sm font-semibold text-gray-700">Interested Area:</label>
                    <select
                      id="interestedArea"
                      name="interestedArea"
                      value={profile.interestedArea}
                      onChange={handleChange}
                      className="mt-1 bg-gray-100 block w-full sm:text-sm p-2"
                      required
                    >
                      <option value="">Select Interested Area</option>
                      <option value="AI">Artificial Intelligence</option>
                      <option value="CyberSecurity">Cyber Security</option>
                      <option value="DataScience">Data Science & Big Data</option>
                      <option value="SoftwareEngineering">Software Engineering</option>
                      <option value="MobileWebDevelopment">Mobile & Web Development</option>
                      <option value="Blockchain">Blockchain & Cryptocurrency</option>
                      <option value="ComputerVision">Computer Vision</option>
                      <option value="IoT">Internet of Things</option>
                      <option value="DistributedComputing">Distributed Computing</option>
                      <option value="BioInformatics">Bio Informatics</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="projectType" className="block text-sm font-semibold text-gray-700">Project Type:</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={profile.projectType}
                      onChange={handleChange}
                      className="mt-1 bg-gray-100 block w-full sm:text-sm p-2"
                      required
                    >
                      <option value="">Select Project Type</option>
                      <option value="Machine Learning">Machine Learning</option>
                      <option value="Networking">Networking</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="Game Development">Game Development</option>
                      <option value="Human Computer Interaction">Human Computer Interaction</option>
                      <option value="Bio Informatics Projects">Bio Informatics Projects</option>
                      <option value="Embedded System Projects">Embedded System Projects</option>
                      <option value="Cloud Computing">Cloud Computing</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="program" className="block text-sm font-semibold text-gray-700">Program:</label>
                    <select
                      id="program"
                      name="program"
                      value={profile.program}
                      onChange={handleChange}
                      className="mt-1 bg-gray-100 block w-full sm:text-sm p-2"
                      required
                    >
                      <option value="">Select Program</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Software Engineering">Software Engineering</option>
                      <option value="AI">AI</option>
                    </select>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      type="submit"
                      className="bg-[#6f5cc3] hover:bg-[#58448c] text-white font-bold py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#6f5cc3] focus:ring-opacity-50"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="bg-white shadow-md p-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1">
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">Full Name:</label>
                    <span>{profile.fullName}</span>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">Email:</label>
                    <span>{profile.email}</span>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">Phone No:</label>
                    <span>{profile.phoneNo}</span>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">Level of Studies:</label>
                    <span>{profile.levelOfStudies}</span>
                  </div>
                </div>

                <div className="col-span-1">
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">Designation:</label>
                    <span>{profile.designation}</span>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">Interested Area:</label>
                    <span>{profile.interestedArea}</span>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">Project Type:</label>
                    <span>{profile.projectType}</span>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">Program:</label>
                    <span>{profile.program}</span>
                  </div>

                  <div className="flex justify-end col-span-2">
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="bg-[#6f5cc3] hover:bg-[#58448c] text-white font-bold py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#6f5cc3] focus:ring-opacity-50"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupervisorProfile;
