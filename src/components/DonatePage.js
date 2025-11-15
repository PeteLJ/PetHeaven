// src/components/DonatePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DonatePage.css';

const DonatePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
    setFormData({ ...formData, [name]: value });
  };

  // Validate donation amount (number >= 1)
  const validateAmount = (amountStr) => {
    const amountNum = parseFloat(amountStr);
    return !isNaN(amountNum) && amountNum >= 1;
  };

  // Validate credit card number
  const validateCardNumber = (number) => {
    const cleaned = number.replace(/\s/g, '');
    const regex = /^\d{16}$/;
    return regex.test(cleaned);
  };

  // Validate expiry date (MM/YY format)
  const validateExpiry = (expiryStr) => {
    const regex = /^(0[1-9]|1[0-2])\/?(\d{2})$/;
    if (!regex.test(expiryStr)) return false;

    const [month, year] = expiryStr.split('/').map(part => parseInt(part, 10));
    const currentYear = new Date().getFullYear() % 100; // Get last 2 digits of current year
    const currentMonth = new Date().getMonth() + 1;

    if (year < currentYear) return false; // Year is in the past
    if (year === currentYear && month < currentMonth) return false; // Month is in the past of current year

    return true;
  };

  // Validate CVV
  const validateCVV = (cvv) => {
    const regex = /^\d{3}$/;
    return regex.test(cvv);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.amount.trim()) newErrors.amount = 'Donation amount is required';
    else if (!validateAmount(formData.amount)) newErrors.amount = 'Amount must be at least $1 and a valid number';
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Credit card number is required';
    else if (!validateCardNumber(formData.cardNumber)) newErrors.cardNumber = 'Invalid card number (16 digits)';
    if (!formData.expiry.trim()) newErrors.expiry = 'Expiry date is required';
    else if (!validateExpiry(formData.expiry)) newErrors.expiry = 'Invalid expiry date (MM/YY, not past)';
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
    else if (!validateCVV(formData.cvv)) newErrors.cvv = 'Invalid CVV (3 digits)';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Donation Form Submitted:', formData);

    alert(`Thank you for your generous donation of $${parseFloat(formData.amount).toFixed(2)}, ${formData.name}! Your support will help us care for more pets.`);

    // Redirect to home page after successful submission
    navigate('/');
  };

  // Handle formatting card number input
  const handleCardNumberChange = (e) => {
    let { value } = e.target;
    // Remove all non-digit characters
    value = value.replace(/\D/g, '');
    // Limit to 16 digits
    value = value.slice(0, 16);
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    setFormData({ ...formData, cardNumber: value });
  };

  // Handle formatting expiry date input
  const handleExpiryChange = (e) => {
    let { value } = e.target;
    // Remove all non-digit characters
    value = value.replace(/\D/g, '');
    // Limit to 4 digits
    value = value.slice(0, 4);
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
    setFormData({ ...formData, expiry: value });
  };

  // Handle formatting CVV input
  const handleCVVChange = (e) => {
    let { value } = e.target;
    // Remove all non-digit characters
    value = value.replace(/\D/g, '');
    // Limit to 3 digits
    value = value.slice(0, 3);
    setFormData({ ...formData, cvv: value });
  };

  return (
    <div className="donate-page-container">
      <div className="form-container">
        <h2>❤️ Make a Donation to Pet Heaven</h2>
        <p>Your contribution helps us provide food, shelter, and medical care for abandoned pets.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label>Donation Amount ($)*</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="min. $1.00"
              min="1"
              step="0.01"
              required
            />
            {errors.amount && <div className="error">{errors.amount}</div>}
          </div>

          <div className="form-group">
            <label>Credit Card Number *</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleCardNumberChange} // Specific handler for formatting
              placeholder="1234 5678 9012 3456"
              required
              maxLength="19"
            />
            {errors.cardNumber && <div className="error">{errors.cardNumber}</div>}
          </div>

          <div className="form-row">
            <div className="form-group half-width">
              <label>Expiry Date *</label>
              <input
                type="text"
                name="expiry"
                value={formData.expiry}
                onChange={handleExpiryChange} // Specific handler for formatting
                placeholder="MM/YY"
                required
                maxLength="5"
              />
              {errors.expiry && <div className="error">{errors.expiry}</div>}
            </div>
            <div className="form-group half-width">
              <label>CVV *</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleCVVChange} // Specific handler for formatting
                placeholder="123"
                required
                maxLength="3"
              />
              {errors.cvv && <div className="error">{errors.cvv}</div>}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit">Donate Now</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonatePage;