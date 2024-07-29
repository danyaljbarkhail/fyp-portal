import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

function Projects() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=6")
      .then(response => response.json())
      .then(data => {
        const users = data.results.map((user, index) => ({
          id: index + 1,
          projectName: user.name.first + "'s Project",
          noOfStudents: Math.floor(Math.random() * 5) + 1,
          supervisor: user.name.first + " " + user.name.last,
          projectArea: user.location.city,
          progress: Math.floor(Math.random() * 100) + "%", 
        }));
        setData(users);
      });
  }, []);

  return (
    <div>
      <div>
        <Sidebar />
      </div>

      <div className='container flex ml-72 mr-12 items-center justify-center w-auto h-16 bg-gray-100 mt-16 '>
        <span className='font-bold'>Department Name: </span>
        <span>Computer Science and IT</span>
      </div>

      <div className="w-[950px] ml-[285px] h-96 mt-5 mb-10 rounded-lg bg-gray-100">
        <span className="font-semibold ml-5">Admin Portal</span>
        <div className="submenue rounded-full w-3/4 ml-6 mt-2 border-blue-300 border-2 h-12">
          <ul className="flex">
            <li className="flex-1 ml-8 mt-2">Students</li>
            <li className="flex-1 mt-2 cursor-pointer">Supervisors</li>
            <Link to='/Projects' className="flex-1 mt-2 cursor-pointer">Projects</Link>
          </ul>
        </div>
        <div className="search mx-1 my-1">
          <div className="relative flex w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 pl-10"
              type="text"
              id="search"
              placeholder="Search something.."
            />
            <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <table className="table-auto w-full">
          <thead className="">
            <tr className="header bg-blue-200">
              <th>Group #</th>
              <th>Project Name</th>
              <th>No of Students</th>
              <th>Supervisor</th>
              <th>Project Area</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {data.map((user, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-purple-200 py-2" : ""}>
                <td>{user.id}</td>
                <td>{user.projectName}</td>
                <td>{user.noOfStudents}</td>
                <td>{user.supervisor}</td>
                <td>{user.projectArea}</td>
                <td>{user.progress}</td>
                <td>
                  <div className="flex">
                    <button className="rounded px-2 py-1 text-xs bg-green-500 text-white hover:bg-green-600 duration-300">
                      ACCEPT
                    </button>
                    <button className="rounded mx-2 px-2 py-1 text-xs bg-red-500 text-white hover:bg-red-600 duration-300">
                      REMOVE
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Projects;
