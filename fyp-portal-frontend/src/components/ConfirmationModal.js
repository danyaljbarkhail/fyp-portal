import React from 'react';

const ConfirmationModal = ({ show, onClose, onConfirm, title, message, isConfirmation = true }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-md sm:w-full p-4">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">{message}</p>
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            {isConfirmation ? (
              <>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={onConfirm}
                >
                  Confirm
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={onClose}
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
