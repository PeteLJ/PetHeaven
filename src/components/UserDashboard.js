// src/components/UserDashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import UserRequestCard from './UserRequestCard';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
  const { user, logout } = useAuth(); // Get logout function from auth context

  const [requests, setRequests] = useState([]);
  const [paymentData, setPaymentData] = useState({}); // Store payment details temporarily per request ID

  // Load requests from localStorage on component mount
  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('petRequests')) || [];
    // Filter requests belonging to the current user
    const userRequests = storedRequests.filter(req => {
      return req.requesterName === user.name || req.requesterEmail === user.email ||
             req.ownerName === user.name || req.ownerEmail === user.email;
    });
    setRequests(userRequests);
  }, [user]);

  if (!user) {
    return (
      <div className="user-dashboard-container">
        <p>Access Denied. Please log in as a user.</p>
        <a href="/login">Go to Login</a>
      </div>
    );
  }

  // Function to update a request in state and localStorage
  const updateRequest = (requestId, updates) => {
    setRequests(prevRequests => {
      const updatedRequests = prevRequests.map(req =>
        req.id === requestId ? { ...req, ...updates } : req
      );

      // Update localStorage
      localStorage.setItem('petRequests', JSON.stringify(updatedRequests));
      return updatedRequests;
    });
  };

  // Function to remove a request from the list and localStorage
  const removeRequest = (requestId) => {
    setRequests(prevRequests => {
      const updatedRequests = prevRequests.filter(req => req.id !== requestId);

      // Update localStorage
      const allStoredRequests = JSON.parse(localStorage.getItem('petRequests')) || [];
      const finalRequests = allStoredRequests.filter(req => req.id !== requestId);
      localStorage.setItem('petRequests', JSON.stringify(finalRequests));

      return updatedRequests;
    });
  };

  // Function to handle payment submission
  const handlePaymentSubmit = (requestId, cardDetails) => {
    console.log(`Processing payment for request ${requestId} with details:`, cardDetails);

    setTimeout(() => {
      updateRequest(requestId, { status: `${requests.find(r => r.id === requestId)?.petName} Adopted`, paymentStatus: 'Completed' });
      alert(`Payment successful! Your adoption of ${requests.find(r => r.id === requestId)?.petName} is now complete!`);
    }, 1000); // 1 sec delay
  };

  // Function to handle collection confirmation for surrenders
  const handleSurrenderConfirmation = (requestId) => {
    // Find the specific request to get its details
    const requestToConfirm = requests.find(r => r.id === requestId);
    if (requestToConfirm && requestToConfirm.type === 'surrender') {
        // Update the collectionConfirmed status and overall status to 'Surrendered'
        updateRequest(requestId, { collectionConfirmed: true, status: 'Surrendered' });
        alert(`Thank you for confirming. Your surrender request for ${requests.find(r => r.id === requestId)?.petName} is now complete!`);
    } else {
        console.error("Attempted to confirm surrender for a non-surrender request or invalid ID:", requestId);
    }
  };

  return (
    <div className="user-dashboard-container">
      <div className="dashboard-header">
        <h1>My Dashboard</h1>
      </div>

      <div className="dashboard-content">
        <h2>My Adoption and Surrender Requests</h2>
        {requests.length > 0 ? (
          requests.map(request => (
            <UserRequestCard
              key={request.id}
              request={request}
              onRemove={removeRequest}
              onPaymentSubmit={handlePaymentSubmit} // Pass payment handler
              onSurrenderConfirm={handleSurrenderConfirmation} // Pass confirmation handler
              paymentData={paymentData[request.id] || {}} // Pass payment data for this request
              setPaymentData={(data) => setPaymentData(prev => ({...prev, [request.id]: data}))} // Pass setter for this request
            />
          ))
        ) : (
          <p>No requests found.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;