import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

const AdminEditSupervisor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const fetchSupervisor = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/supervisors/${id}`);
        const supervisorData = response.data;

        setProfile({
          fullName: supervisorData.profile.fullName,
          regNo: supervisorData.profile.regNo,
          email: supervisorData.profile.email,
          phoneNo: supervisorData.profile.phoneNo,
          designation: supervisorData.profile.designation,
          interestedArea: supervisorData.profile.interestedArea,
          projectType: supervisorData.profile.projectType,
          program: supervisorData.profile.program,
          levelOfStudies: supervisorData.profile.levelOfStudies,
        });
      } catch (error) {
        console.error('Error fetching supervisor:', error);
      }
    };

    fetchSupervisor();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3000/api/supervisors/supervisors/${id}`, profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Supervisor profile updated successfully!');
      navigate('/AdminDashboardSupervisors');
    } catch (error) {
      console.error('Error updating supervisor:', error);
      alert('Error updating supervisor. Please try again.');
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="container flex ml-72 mr-12 items-center justify-center w-auto h-16 bg-gray-100 mt-16 ">
        <span className="font-bold">Department Name:</span>
        <span>Computer Science and IT</span>
      </div>
      <div className="w-[930px] ml-72 mt-5 h-96 mb-36 rounded-lg bg-gray-100">
        <div className="bg-purple-300 h-10 w-5/3 mt-3 rounded-lg">
          <span className="ml-4 font-bold">Edit Supervisor Profile</span>
        </div>
        <div className="flex">
          <form className="bg-white shadow-md rounded-lg p-6 w-full" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6 w-5/6">
              <div className="col-span-1">
                <div className="mb-4 flex items-center">
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 w-24">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    className="mt-1 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
                  />
                </div>
                <div className="mb-4 flex items-center">
                  <label htmlFor="regNo" className="block text-sm font-semibold text-gray-700 w-14">
                    ID No:
                  </label>
                  <input
                    type="text"
                    id="regNo"
                    name="regNo"
                    value={profile.regNo}
                    onChange={handleChange}
                    className="mt-1 focus:ring-indigo-500 ml-6 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
                  />
                </div>
                <div className="mb-4 flex items-center">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mr-2">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="focus:ring-indigo-500 bg-gray-200 ml-7 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
                  />
                </div>
                <div className="mb-4 flex items-center">
                  <label htmlFor="phoneNo" className="block text-sm font-semibold text-gray-700 w-24 mr-2">
                    Phone No:
                  </label>
                  <input
                    type="text"
                    id="phoneNo"
                    name="phoneNo"
                    value={profile.phoneNo}
                    onChange={handleChange}
                    className="focus:ring-indigo-500 -ml-1 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
                  />
                </div>
                <div className="mb-4 flex items-center">
                  <label htmlFor="designation" className="block text-sm font-semibold text-gray-700 w-24 mr-2">
                    Designation:
                  </label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={profile.designation}
                    onChange={handleChange}
                    className="focus:ring-indigo-500 -ml-1 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
                  />
                </div>
              </div>

              <div className="col-span-1">
                <div className="mb-4 flex items-center">
                  <label htmlFor="interestedArea" className="block text-sm font-semibold text-gray-700 w-16 mr-2">
                    Interested Area:
                  </label>
                  <select
                    id="interestedArea"
                    name="interestedArea"
                    value={profile.interestedArea}
                    onChange={handleChange}
                    className="mt-1 ml-2 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
                  >
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

                <div className="mb-4 flex items-center">
                  <label htmlFor="projectType" className="block text-sm font-semibold text-gray-700 mr-2">
                    Project Type:
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={profile.projectType}
                    onChange={handleChange}
                    className="mt-1 focus:ring-indigo-500 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
                  >
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
                <div className="mb-4 flex items-center">
                  <label htmlFor="program" className="block text-sm font-semibold text-gray-700 mr-4">
                    Program:
                  </label>
                  <select
                    id="program"
                    name="program"
                    value={profile.program}
                    onChange={handleChange}
                    className="mt-1 focus:ring-indigo-500 -ml-3 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
                  >
                    <option value="">Select Program</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="AI">AI</option>
                  </select>
                </div>
                <div className="mb-4 flex items-center">
                  <label htmlFor="levelOfStudies" className="block text-sm font-semibold text-gray-700 mr-2">
                    Level of Studies:
                  </label>
                  <select
                    id="levelOfStudies"
                    name="levelOfStudies"
                    value={profile.levelOfStudies}
                    onChange={handleChange}
                    className="mt-1 focus:ring-indigo-500 -ml-1 bg-gray-200 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 border-2 rounded-md"
                  >
                    <option value="">Select Level</option>
                    <option value="Bachelors">Bachelors</option>
                    <option value="Masters">Masters</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEditSupervisor;
