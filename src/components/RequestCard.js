// src/components/RequestCard.js
import React from 'react';
import '../styles/StaffDashboard.css';

const RequestCard = ({ request, onViewDetails }) => { // Receive function as a property

  return (
    <div className="request-card">
      <div className="request-info">
        <p><strong>Type:</strong> {request.type.charAt(0).toUpperCase() + request.type.slice(1)}</p>
        <p><strong>Pet Name:</strong> {request.petName}</p>
        <p><strong>Requester/Owner:</strong> {request.requesterName || request.ownerName}</p>
        <p><strong>Email:</strong> {request.requesterEmail || request.ownerEmail}</p>
        <p><strong>Status:</strong> <span className={`status ${request.status.toLowerCase()}`}>{request.status}</span></p>
      </div>
      <div className="request-actions">
        <button className="view-details-btn" onClick={() => onViewDetails(request)}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default RequestCard;