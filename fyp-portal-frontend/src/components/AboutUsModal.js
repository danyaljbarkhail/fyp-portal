import React from 'react';
import './AboutUsModal.css';

const AboutUsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>About Us</h2>
        <h3>Final Year Project Management System</h3>
        <p className="about-description">
          This project was developed as a part of the final year project for the Computer Science and IT department. 
          The aim is to create a robust platform for managing final year projects efficiently, allowing supervisors and 
          students to collaborate seamlessly.
        </p>
        <h4>Project Developed By:</h4>
        <ul className="developer-list">
          <li>Ahmad Elyas Amini</li>
          <li>Danyal Jabarkhail</li>
          <li>Aqib Dunya Dar</li>
        </ul>
        <h4>Supervised By:</h4>
        <p>Dr. Imran Khalil - Assistant Professor & Post Graduate Advisor CSIT Department
</p>
      </div>
    </div>
  );
};

export default AboutUsModal;
