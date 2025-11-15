// src/components/RequestDetails.js
import React from 'react';
import '../styles/StaffDashboard.css';

const RequestDetails = ({ request, onClose, onStatusUpdate }) => {
  const handleApprove = () => {
    onStatusUpdate(request.id, 'Approved');
  };

  const handleReject = () => {
    onStatusUpdate(request.id, 'Rejected');
  };

  // Determine labels based on request type
  const isAdoption = request.type === 'adoption';
  const requesterLabel = isAdoption ? 'Requestor' : 'Owner';
  const experienceOrIssuesLabel = isAdoption ? 'Experience (Adoption)' : 'Health Issues (Surrender)';
  const reasonOrExperienceValue = isAdoption ? request.requesterExperience : request.healthIssues;
  const reasonLabel = isAdoption ? '' : 'Reason for Surrender';
  const reasonValue = isAdoption ? '' : request.reason;
  // Get NRIC field name
  const nricFieldName = isAdoption ? 'requesterNRIC' : 'ownerNRIC';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Request Details</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <p><strong>ID:</strong> {request.id}</p>
          <p><strong>Type:</strong> {request.type}</p>
          <p><strong>Status:</strong> <span className={`status ${request.status.toLowerCase()}`}>{request.status}</span></p>
          <p><strong>Submitted At:</strong> {new Date(request.submittedAt).toLocaleString()}</p>
          <hr />
          <h3>Pet Information:</h3>
          <p><strong>Name:</strong> {request.petName}</p>
          {request.petType && <p><strong>Type:</strong> {request.petType}</p>}
          {request.petBreed && <p><strong>Breed:</strong> {request.petBreed}</p>}
          {request.petAge && <p><strong>Age:</strong> {request.petAge}</p>}
          <h3>{requesterLabel} Information:</h3>
          <p><strong>Name:</strong> {request.requesterName || request.ownerName}</p>
          <p><strong>Email:</strong> {request.requesterEmail || request.ownerEmail}</p>
          <p><strong>Phone:</strong> {request.requesterPhone || request.ownerPhone}</p>
          <p><strong>Address:</strong> {request.requesterAddress || request.ownerAddress}</p>
          {request[nricFieldName] && <p><strong>NRIC:</strong> {request[nricFieldName]}</p>}
          {reasonValue && <p><strong>{reasonLabel}:</strong> {reasonValue}</p>}
          {reasonOrExperienceValue && <p><strong>{experienceOrIssuesLabel}:</strong> {reasonOrExperienceValue}</p>}
        </div>
        <div className="modal-footer">
          <button className="approve-btn" onClick={handleApprove}>Approve</button>
          <button className="reject-btn" onClick={handleReject}>Reject</button>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;