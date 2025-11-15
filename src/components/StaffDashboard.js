// src/components/StaffDashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import RequestCard from './RequestCard';
import RequestDetails from './RequestDetails';
import '../styles/StaffDashboard.css';

const StaffDashboard = () => {
  const { staff, logout } = useAuth(); // Keep logout function for modal actions

  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('petRequests')) || [];
    setRequests(storedRequests);
  }, []);

  const updateRequestStatus = (requestId, newStatus) => {
    setRequests(prevRequests => {
      const updatedRequests = prevRequests.map(req =>
        req.id === requestId ? { ...req, status: newStatus } : req
      );
      localStorage.setItem('petRequests', JSON.stringify(updatedRequests));
      return updatedRequests;
    });
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  if (!staff) {
    return (
      <div className="dashboard-container">
        <p>Access Denied. Please log in as staff.</p>
        <a href="/staff-login">Go to Staff Login</a>
      </div>
    );
  }

  const openDetailsModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const adoptionRequests = requests.filter(req => req.type === 'adoption');
  const surrenderRequests = requests.filter(req => req.type === 'surrender');

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Staff Dashboard</h1>
      </div>

      <div className="dashboard-content">
        <div className="requests-section">
          <h2>Adoption Requests</h2>
          {adoptionRequests.length > 0 ? (
            adoptionRequests.map(request => (
              <RequestCard
                key={request.id}
                request={request}
                onViewDetails={openDetailsModal}
              />
            ))
          ) : (
            <p>No adoption requests found.</p>
          )}
        </div>

        <div className="requests-section">
          <h2>Surrender Requests</h2>
          {surrenderRequests.length > 0 ? (
            surrenderRequests.map(request => (
              <RequestCard
                key={request.id}
                request={request}
                onViewDetails={openDetailsModal}
              />
            ))
          ) : (
            <p>No surrender requests found.</p>
          )}
        </div>
      </div>

      {isModalOpen && selectedRequest && (
        <RequestDetails
          request={selectedRequest}
          onClose={() => setIsModalOpen(false)}
          onStatusUpdate={updateRequestStatus}
        />
      )}
    </div>
  );
};

export default StaffDashboard;