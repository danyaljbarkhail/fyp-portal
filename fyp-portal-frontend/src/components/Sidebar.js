import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Assuming your logo is in the assets folder
import ConfirmationModal from './ConfirmationModal';

function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSignOutClick = () => {
    setShowModal(true);
  };

  const handleSignOutConfirm = () => {
    setShowModal(false);
    // Perform sign out logic here
    navigate('/login'); // Redirect to login page after sign out
  };

  const handleSignOutCancel = () => {
    setShowModal(false);
  };

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-[#58448c]">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={toggleSidebar}
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="" className="flex ms-2 md:me-24">
                <img
                  src={logo}
                  className="h-8 me-3"
                  alt="Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">
                  FYP Portal
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                  </button>
                </div>
                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow" id="dropdown-user">
                  <div className="px-4 py-3" role="none">
                    <p className="text-sm text-gray-900" role="none">
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate" role="none">
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        Settings
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-[#6f5cc3] sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-[#6f5cc3]">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to='/AdminDashboard' className="flex items-center p-2 text-white rounded-lg hover:bg-[#5a2b96] group">
                <svg
                  className="w-5 h-5 text-white transition duration-75 group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                </svg>
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to='/AdminDashboardProject' className="flex items-center p-2 text-white rounded-lg hover:bg-[#5a2b96] group">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2L2 7v2h20V7l-10-5zm10 7H2v10a1 1 0 0 0 1 1h7v-7h4v7h7a1 1 0 0 0 1-1V9zm-9 2h-2v2h2v-2z"/>
                </svg>
                <span className="ms-2">Projects</span>
              </Link>
            </li>
            <li>
              <Link to='/AdminDashboardSupervisors' className="flex items-center p-2 text-white rounded-lg hover:bg-[#5a2b96] group">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M16 8c0 2.21-1.79 4-4 4s-4-1.79-4-4l.11-.94L5 5.5L12 2l7 3.5v5h-1V6l-2.11 1.06zm-4 6c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"/>
                </svg>
                <span className="ms-3">Supervisors</span>
              </Link>
            </li>
            <li>
              <Link to='/AdminDashboardStudent' className="flex items-center p-2 text-white rounded-lg hover:bg-[#5a2b96] group">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19.923 14.885V9.562l-7.146 3.875q-.366.211-.774.211q-.407 0-.78-.212L4.388 9.702q-.217-.13-.32-.308T3.965 9t.103-.394t.32-.308l6.834-3.724q.182-.102.375-.152q.192-.05.403-.05t.403.052t.374.159l7.717 4.18q.205.104.317.3t.112.422v5.4q0 .212-.144.356t-.356.144t-.357-.144t-.143-.356m-8.7 3.379L6.839 15.89q-.385-.218-.612-.602Q6 14.907 6 14.463v-3.108l5.223 2.833q.366.211.774.211q.407 0 .78-.212L18 11.354v3.111q0 .45-.227.83q-.227.378-.611.596l-4.385 2.373q-.184.105-.378.158t-.399.053t-.399-.053t-.378-.158"/>
                </svg>
                <span className="ms-3">Students</span>
              </Link>
            </li>
            <li>
              <button
                onClick={handleSignOutClick}
                className="flex items-center p-2 text-white rounded-lg hover:bg-[#5a2b96] group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M4 12a1 0 0 0 1 1h7.59l-2.3 2.29a1 0 0 0 0 1.42a1 0 0 0 1.42 0l4-4a1 0 0 0 .21-.33a1 0 0 0 0-.76a1 0 0 0-.21-.33l-4-4a1 0 1 0-1.42 1.42l2.3 2.29H5a1 0 0 0-1 1M17 2H7a3 3 0 0 0-3 3v3a1 1 0 0 0 2 0V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-3a1 1 0 0 0-2 0v3a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3"/>
                </svg>
                <span className="ms-3">SignOut</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
      </div>

      <ConfirmationModal
        show={showModal}
        onClose={handleSignOutCancel}
        onConfirm={handleSignOutConfirm}
        title="Confirm Sign Out"
        message="Are you sure you want to sign out?"
      />
    </div>
  );
}

export default Sidebar;
