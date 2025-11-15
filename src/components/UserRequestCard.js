// src/components/UserRequestCard.js
import React, { useState } from 'react';
import '../styles/UserDashboard.css';

// Helper function to format credit card number
const formatCardNumber = (value) => {
  // Remove all non-digit characters
  const cleanedValue = value.replace(/\D/g, '');
  // Limit to 16 digits
  const truncatedValue = cleanedValue.slice(0, 16);
  const formattedValue = truncatedValue.replace(/(\d{4})/g, '$1 ').trim();
  return formattedValue;
};

// Helper function to format expiry date
const formatExpiryDate = (value) => {
  // Remove all non-digit characters
  const cleanedValue = value.replace(/\D/g, '');
  // Limit to 4 digits
  const truncatedValue = cleanedValue.slice(0, 4);
  if (truncatedValue.length > 2) {
    return truncatedValue.substring(0, 2) + '/' + truncatedValue.substring(2);
  }
  return truncatedValue;
};

// Helper function to format CCV
const formatCCV = (value) => {
  // Remove all non-digit characters
  const cleanedValue = value.replace(/\D/g, '');
  // Limit to 3 digits
  const truncatedValue = cleanedValue.slice(0, 3);
  return truncatedValue;
};

// Helper function to validate credit card number
const validateCardNumber = (value) => {
  const cleanedValue = value.replace(/\s/g, '');
  const regex = /^\d{16}$/; // Check for exactly 16 digits
  return regex.test(cleanedValue);
};

// Helper function to validate expiry date
const validateExpiryDate = (value) => {
  const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // MM/YY or MMYY
  if (!regex.test(value)) return false;

  const [month, year] = value.split('/').map(part => parseInt(part, 10));
  const currentYear = new Date().getFullYear() % 100; // Get last 2 digits of current year
  const currentMonth = new Date().getMonth() + 1;

  if (year < currentYear) return false; // Year is in the past
  if (year === currentYear && month < currentMonth) return false; // Month is in the past of current year

  return true;
};

// Helper function to validate CCV
const validateCCV = (value) => {
  const regex = /^\d{3}$/;
  return regex.test(value);
};

const UserRequestCard = ({ request, onRemove, onPaymentSubmit, onSurrenderConfirm, paymentData, setPaymentData }) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false); // State to control payment form visibility

  const handleCancel = () => {
    if (request.status === 'Pending') {
      if (window.confirm('Are you sure you want to cancel this pending request?')) {
        onRemove(request.id);
      }
    } else {
      if (window.confirm('Are you sure you want to remove this request record?')) {
        onRemove(request.id);
      }
    }
  };

  // Handle payment form input changes with formatting
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiry') {
      formattedValue = formatExpiryDate(value);
    } else if (name === 'ccv') {
      formattedValue = formatCCV(value);
    }

    setPaymentData({ ...paymentData, [name]: formattedValue });
  };

  // Handle payment form submission
  const handlePaymentFormSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    const cardNumberValid = validateCardNumber(paymentData.cardNumber);
    const expiryValid = validateExpiryDate(paymentData.expiry);
    const ccvValid = validateCCV(paymentData.ccv);

    if (!cardNumberValid || !expiryValid || !ccvValid) {
        alert('Please enter valid card details.');
        return; // Stop submission if validation fails
    }

    onPaymentSubmit(request.id, paymentData);
    setShowPaymentForm(false); // Hide form after submission
  };

  // Handler for surrender confirmation button
  const handleSurrenderConfirmClick = () => {
      onSurrenderConfirm(request.id);
  };

  let actionButton = null;
  let additionalInfo = null;

  if (request.status === 'Pending') {
    // Handle Pending status for both adoption and surrender
    additionalInfo = <p><strong>Status:</strong> <span className="status pending">Pending</span></p>;
    actionButton = <button className="cancel-btn" onClick={handleCancel}>Cancel</button>;
  } else if (request.status === 'Approved') {
    // Handle Approved status
    if (request.type === 'adoption') {
      additionalInfo = <p><strong>Status:</strong> <span className="status approved">Approved</span></p>;
      actionButton = (
        <button className="payment-btn" onClick={() => setShowPaymentForm(true)}>
          Proceed to Payment
        </button>
      );
    } else if (request.type === 'surrender') {
      additionalInfo = <p><strong>Status:</strong> <span className="status approved">Approved</span></p>;
      actionButton = (
        request.collectionConfirmed ? (
            <p><em>Confirmation Sent</em></p>
        ) : (
          <button className="confirm-btn" onClick={handleSurrenderConfirmClick}>
            Confirm Ready for Collection
          </button>
        )
      );
    }
  } else if (request.status.includes('Adopted')) { // Check if status contains "Adopted"
      additionalInfo = <p><strong>Status:</strong> <span className="status adopted">{request.status}</span></p>;
      actionButton = <button className="delete-btn" onClick={handleCancel}>Remove Record</button>;
  } else if (request.status === 'Surrendered') { // Check if status contains 'Surrendered'
      additionalInfo = <p><strong>Status:</strong> <span className="status surrendered">Surrendered</span></p>;
      actionButton = <button className="delete-btn" onClick={handleCancel}>Remove Record</button>;
  } else if (request.status === 'Rejected') {
      additionalInfo = <p><strong>Status:</strong> <span className="status rejected">Rejected</span></p>;
      actionButton = <button className="delete-btn" onClick={handleCancel}>Delete</button>;
  } else {
      additionalInfo = <p><strong>Status:</strong> <span className="status">{request.status}</span></p>;
      actionButton = <button className="delete-btn" onClick={handleCancel}>Remove Record</button>;
  }

  return (
    <div className="user-request-card">
      <div className="request-info">
        <p><strong>Type:</strong> {request.type.charAt(0).toUpperCase() + request.type.slice(1)}</p>
        <p><strong>Pet Name:</strong> {request.petName}</p>
        <p><strong>Submitted At:</strong> {new Date(request.submittedAt).toLocaleString()}</p>
        {additionalInfo}
      </div>
      <div className="request-actions">
        {actionButton}
        {showPaymentForm && request.type === 'adoption' && request.status === 'Approved' && (
          <div className="payment-form-overlay">
            <div className="payment-form-content">
              <h3>Payment for {request.petName}</h3>
              <form onSubmit={handlePaymentFormSubmit}>
                <div className="form-group">
                  <label>Credit Card Number *</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentData.cardNumber || ''}
                    onChange={handlePaymentChange}
                    placeholder="1234 5678 9012 3456"
                    required
                    maxLength="19"
                  />
                </div>
                <div className="form-group">
                  <label>Expiry Date *</label>
                  <input
                    type="text"
                    name="expiry"
                    value={paymentData.expiry || ''}
                    onChange={handlePaymentChange}
                    placeholder="MM/YY"
                    required
                    maxLength="5"
                  />
                </div>
                <div className="form-group">
                  <label>CCV *</label>
                  <input
                    type="text"
                    name="ccv"
                    value={paymentData.ccv || ''}
                    onChange={handlePaymentChange}
                    placeholder="123"
                    required
                    maxLength="3"
                  />
                </div>
                <div className="form-actions">
                  <button type="submit">Submit Payment</button>
                  <button type="button" onClick={() => setShowPaymentForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRequestCard;