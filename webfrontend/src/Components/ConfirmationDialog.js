import React from 'react';

const ConfirmationDialog = ({ message, onConfirm, onCancel, isOpen }) => {
  return isOpen ? (
    <div className="confirmation-dialog">
      <div className="message">{message}</div>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>No</button>
    </div>
  ) : null;
};

export default ConfirmationDialog;
