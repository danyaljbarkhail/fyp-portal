import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StudentSidebar from './StudentSideBar';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ConfirmationModal from './ConfirmationModal';

const StudentProjectCreation = () => {
  const [formData, setFormData] = useState({
    projectTitle: '',
    description: '',
    projectType: '',
    supervisor: '',
    program: '',
    groupMembers: '',
    proposalUrl: ''
  });
  const [customProjectType, setCustomProjectType] = useState('');
  const [supervisors, setSupervisors] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/supervisors', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setSupervisors(response.data);
      } catch (error) {
        console.error('Error fetching supervisors:', error.response?.data || error.message);
      }
    };

    fetchSupervisors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
    if (name === "projectType" && value === "Other") {
      setCustomProjectType('');
    }
  };

  const handleCustomTypeChange = (e) => {
    setCustomProjectType(e.target.value);
    setFormData({ ...formData, projectType: e.target.value });
    setErrors({ ...errors, projectType: '' });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setErrors({ ...errors, proposalUrl: '' });
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `proposals/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setUploading(true);

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      error => {
        console.error('Error uploading file:', error);
        setUploading(false);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setUploading(false);
        setIsFileUploaded(true);
        setFormData((prevData) => ({ ...prevData, proposalUrl: url }));
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.projectTitle) newErrors.projectTitle = 'Project Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.projectType) newErrors.projectType = 'Project Type is required';
    if (!formData.supervisor) newErrors.supervisor = 'Supervisor is required';
    if (!formData.program) newErrors.program = 'Program is required';
    if (!formData.proposalUrl) newErrors.proposalUrl = 'Proposal must be uploaded';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/projects', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Project created successfully:', response.data);
      setModalMessage('Project request was sent successfully');
      setIsModalOpen(true);
      setFormData({
        projectTitle: '',
        description: '',
        projectType: '',
        supervisor: '',
        program: '',
        groupMembers: '',
        proposalUrl: ''
      });
      setFile(null);
      setIsFileUploaded(false);
    } catch (error) {
      console.error('Error creating project:', error.response?.data || error.message);
    }
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    navigate('/StudentProject');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <StudentSidebar />
      <div className="flex-grow mt-16 md:mt-4 md:ml-4 p-6">
        <div className='container flex items-center justify-center w-full h-16 bg-gray-100 mt-16'>
          <span className='font-bold mr-2 text-lg'>Department Name:</span>
          <span className='text-lg'>Computer Science and IT</span>
        </div>

        <div className="max-w-4xl mx-auto mt-5 mb-36 p-6 md:p-8 bg-white shadow-md">
          <h2 className="text-2xl font-bold text-center text-white bg-[#6f5cc3] p-4">Project Creation Form</h2>

          <form className="bg-white shadow-md p-6 mt-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1">
                <div className="mb-4">
                  <label htmlFor="projectTitle" className="block text-sm font-semibold text-gray-700">Project Title:</label>
                  <input type="text" id="projectTitle" name="projectTitle" placeholder='Enter Project Title' className="mt-1 bg-gray-100 block w-full sm:text-sm p-2" value={formData.projectTitle} onChange={handleChange} />
                  {errors.projectTitle && <span className="text-red-500 text-sm">{errors.projectTitle}</span>}
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Description:</label>
                  <textarea id="description" name="description" rows="4" placeholder='Write a brief Description' className="mt-1 bg-gray-100 block w-full sm:text-sm p-2" value={formData.description} onChange={handleChange}></textarea>
                  {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
                </div>
                <div className="mb-4">
                  <label htmlFor="proposal" className="block text-sm font-semibold text-gray-700">Proposal:</label>
                  <input type="file" id="proposal" name="proposal" className="mt-1 bg-gray-100 block w-full sm:text-sm p-2" onChange={handleFileChange} />
                  <button type="button" onClick={handleUpload} className="mt-2 bg-[#6f5cc3] hover:bg-[#58448c] text-white font-bold py-2 px-4 w-full rounded">
                    Upload Proposal
                  </button>
                  {uploading && <div className="mt-2 w-full bg-gray-200 rounded h-4">
                    <div className="bg-blue-600 h-4 rounded" style={{ width: `${uploadProgress}%` }}></div>
                  </div>}
                  {isFileUploaded && !uploading && <span className="text-green-500 text-sm">Proposal was uploaded</span>}
                  {errors.proposalUrl && <span className="text-red-500 text-sm">{errors.proposalUrl}</span>}
                </div>
              </div>
              <div className="col-span-1">
                <div className="mb-4">
                  <label htmlFor="projectType" className="block text-sm font-semibold text-gray-700">Project Type:</label>
                  <select id="projectType" name="projectType" className="mt-1 bg-gray-100 block w-full sm:text-sm p-2" value={formData.projectType} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="AI">Machine Learning Projects</option>
                    <option value="Security Projects">Security Projects</option>
                    <option value="Networking ProjectsFlutter">Networking Projects</option>
                    <option value="Web Development Projects">Web Development Projects</option>
                    <option value="Mobile App Development Projects">Mobile App Development Projects</option>
                    <option value="Game Development Projects">Game Development Projects</option>
                    <option value="Human-Computer Interaction">Human-Computer Interaction</option>
                    <option value="Bioinformatics Projects">Bioinformatics Projects</option>
                    <option value="Embedded Systems Projects">Embedded Systems Projects</option>
                    <option value="Cloud Computing Projects">Cloud Computing Projects</option>
                    <option value="Other">Other (Specify Below)</option>
                  </select>
                  {formData.projectType === "Other" && (
                    <input
                      type="text"
                      id="customProjectType"
                      name="customProjectType"
                      placeholder="Specify your project type"
                      value={customProjectType}
                      onChange={handleCustomTypeChange}
                      className="mt-1 bg-gray-100 block w-full sm:text-sm p-2"
                    />
                  )}
                  {errors.projectType && <span className="text-red-500 text-sm">{errors.projectType}</span>}
                </div>
                <div className="mb-4">
                  <label htmlFor="supervisor" className="block text-sm font-semibold text-gray-700">Supervisor:</label>
                  <select id="supervisor" name="supervisor" className="mt-1 bg-gray-100 block w-full sm:text-sm p-2" value={formData.supervisor} onChange={handleChange}>
                    <option value="">Select Supervisor</option>
                    {supervisors.map((supervisor) => (
                      <option key={supervisor._id} value={supervisor._id}>
                        {supervisor.profile?.fullName || 'Unnamed Supervisor'}
                      </option>
                    ))}
                  </select>
                  {errors.supervisor && <span className="text-red-500 text-sm">{errors.supervisor}</span>}
                </div>
                <div className="mb-4">
                  <label htmlFor="program" className="block text-sm font-semibold text-gray-700">Program:</label>
                  <select id="program" name="program" className="mt-1 bg-gray-100 block w-full sm:text-sm p-2" value={formData.program} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Bcs">Bcs</option>
                    <option value="Msc">Msc</option>
                    <option value="Phd">Phd</option>
                  </select>
                  {errors.program && <span className="text-red-500 text-sm">{errors.program}</span>}
                </div>
                <div className="mb-4">
                  <label htmlFor="groupMembers" className="block text-sm font-semibold text-gray-700">Group Members:</label>
                  <input type="text" id="groupMembers" name="groupMembers" placeholder='20PWBCSXXX, 21PWBCSXXX, ...' className="mt-1 bg-gray-100 block w-full sm:text-sm p-2" value={formData.groupMembers} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button type="submit" className="bg-[#6f5cc3] hover:bg-[#58448c] text-white font-bold py-2 px-4 w-full">
                APPLY
              </button>
            </div>
          </form>
        </div>
      </div>
      <ConfirmationModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
        title="Success"
        message="Project request was sent successfully"
      />
    </div>
  );
};

export default StudentProjectCreation;
