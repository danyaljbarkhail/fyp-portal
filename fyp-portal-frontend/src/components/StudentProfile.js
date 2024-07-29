import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentSideBar from './StudentSideBar';

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    batchNo: '',
    email: '',
    phoneNo: '',
    regNo: '',
    section: '',
    program: '',
    batchStream: '', // Changed from batchAdvisor to batchStream
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);

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
          batchNo: user.batchNo || '',
          email: user.email || '',
          phoneNo: user.phoneNo || '',
          regNo: user.regNo || '',
          section: user.section || '',
          program: user.program || '',
          batchStream: user.batchStream || '', // Changed from batchAdvisor to batchStream
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailValid || !phoneValid) {
      return;
    }
    try {
      await axios.put('http://localhost:3000/api/auth/profile', profile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setEditing(false); // Hide the form and show the profile
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleEdit = () => {
    setEditing(true); // Show the form for editing
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });

    if (name === 'email') {
      setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    }

    if (name === 'phoneNo') {
      setPhoneValid(/^\+?\d{0,13}$/.test(value));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <StudentSideBar />

      <div className="flex-grow mt-16 md:mt-4 md:ml-4 p-6">
        <div className='container flex items-center justify-center w-full h-16 bg-gray-100 mt-16'>
          <span className='font-bold mr-2 text-lg'>Department Name:</span>
          <span className='text-lg'>Computer Science and IT</span>
        </div>

        <div className="max-w-4xl mx-auto mt-5 mb-36 p-6 md:p-8 bg-white shadow-md">
          <h2 className="text-2xl font-bold text-center text-white bg-[#6f5cc3] p-4">My Profile - Student</h2>

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
                      onChange={handleInputChange}
                      className="mt-1 bg-gray-100 block w-full sm:text-sm p-2"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="batchNo" className="block text-sm font-semibold text-gray-700">Batch No:</label>
                    <input
                      type="text"
                      id="batchNo"
                      name="batchNo"
                      value={profile.batchNo}
                      onChange={handleInputChange}
                      className="mt-1 bg-gray-100 block w-full sm:text-sm p-2"
                      placeholder="Enter your batch number"
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
                      onChange={handleInputChange}
                      className={`mt-1 block w-full sm:text-sm bg-gray-100 p-2 ${emailValid ? 'focus:border-green-500 border-green-500' : 'focus:border-red-500 border-red-500'}`}
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
                      onChange={handleInputChange}
                      className={`mt-1 block w-full sm:text-sm bg-gray-100 p-2 ${phoneValid ? 'focus:border-green-500 border-green-500' : 'focus:border-red-500 border-red-500'}`}
                      placeholder="Enter your phone number"
                      pattern="^\+?\d{0,13}$"
                      required
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="mb-4">
                    <label htmlFor="regNo" className="block text-sm font-semibold text-gray-700">Reg No:</label>
                    <input
                      type="text"
                      id="regNo"
                      name="regNo"
                      value={profile.regNo}
                      onChange={handleInputChange}
                      className="mt-1 bg-gray-100 block w-full sm:text-sm p-2"
                      placeholder="Enter your registration number"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="section" className="block text-sm font-semibold text-gray-700">Section:</label>
                    <input
                      type="text"
                      id="section"
                      name="section"
                      value={profile.section}
                      onChange={handleInputChange}
                      className="mt-1 bg-gray-100 block w-full sm:text-sm p-2"
                      placeholder="Enter your section"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="program" className="block text-sm font-semibold text-gray-700">Program:</label>
                    <select
                      id="program"
                      name="program"
                      value={profile.program}
                      onChange={handleInputChange}
                      className="mt-1 bg-gray-100 block w-full sm:text-sm p-2"
                      required
                    >
                      <option value="">Select Program</option>
                      <option value="Bsc">Bsc</option>
                      <option value="Msc">Msc</option>
                      <option value="Phd">Phd</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="batchStream" className="block text-sm font-semibold text-gray-700">Batch Stream:</label>
                    <select
                      id="batchStream"
                      name="batchStream"
                      value={profile.batchStream}
                      onChange={handleInputChange}
                      className="mt-1 bg-gray-100 block w-full sm:text-sm p-2"
                      required
                    >
                      <option value="">Select Batch Stream</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Data Science">Data Science</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="bg-[#6f5cc3] hover:bg-[#58448c] text-white font-semibold py-2 px-4 w-full"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-white shadow-md p-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1">
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">
                      Full Name:
                    </label>
                    <span>{profile.fullName}</span>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">
                      Batch No:
                    </label>
                    <span>{profile.batchNo}</span>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">
                      Email:
                    </label>
                    <span>{profile.email}</span>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">
                      Phone No:
                    </label>
                    <span>{profile.phoneNo}</span>
                  </div>
                </div>

                <div className="col-span-1">
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">
                      Reg No:
                    </label>
                    <span>{profile.regNo}</span>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">
                      Section:
                    </label>
                    <span>{profile.section}</span>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">
                      Program:
                    </label>
                    <span>{profile.program}</span>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">
                      Batch Stream:
                    </label>
                    <span>{profile.batchStream}</span>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="bg-[#6f5cc3] hover:bg-[#58448c] text-white font-bold py-2 px-4 w-full"
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

export default StudentProfile;
