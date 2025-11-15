// src/components/SurrenderForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Form.css';

const SurrenderForm = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    nric: '', // New field
    petName: '',
    petType: 'cat',
    petBreed: '',
    petAge: '',
    reason: '',
    healthIssues: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Validate NRIC format (S/T followed by 7 digits and 1 letter A-Z)
  const validateNRIC = (nric) => {
     const nricRegex = /^(S|T)\d{7}[A-Z]$/i;
     return nricRegex.test(nric);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.ownerName.trim()) newErrors.ownerName = 'Your name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.nric.trim()) newErrors.nric = 'NRIC is required';
    else if (!validateNRIC(formData.nric)) newErrors.nric = 'Invalid NRIC format (e.g., S1234567A)';
    if (!formData.petName.trim()) newErrors.petName = 'Pet name is required';
    if (!formData.reason.trim()) newErrors.reason = 'Please explain your reason for surrender';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare data for submission
    const submissionData = {
      id: Date.now(),
      type: 'surrender',
      petName: formData.petName,
      ownerName: formData.ownerName,
      ownerEmail: formData.email,
      ownerPhone: formData.phone,
      ownerAddress: formData.address,
      ownerNRIC: formData.nric, // Include NRIC
      petType: formData.petType,
      petBreed: formData.petBreed,
      petAge: formData.petAge,
      reason: formData.reason,
      healthIssues: formData.healthIssues,
      status: 'Pending', // Default status for staff
      submittedAt: new Date().toISOString(),
      collectionConfirmed: false // New field for surrender confirmation tracking
    };

    // Store submission in localStorage
    const storedRequests = JSON.parse(localStorage.getItem('petRequests')) || [];
    storedRequests.push(submissionData);
    localStorage.setItem('petRequests', JSON.stringify(storedRequests));

    alert('Thank you for your surrender request. Our team will contact you soon to assist. Request is pending staff review.');
    console.log('Surrender Form Submitted:', submissionData);
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>Surrender Your Pet to Pet Heaven</h2>
      <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>
        We understand this is difficult. Your pet will be cared for with love and respect. <strong>Request is pending staff review.</strong>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your Full Name *</label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            required
          />
          {errors.ownerName && <div className="error">{errors.ownerName}</div>}
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <div className="error">{errors.phone}</div>}
        </div>
        <div className="form-group">
          <label>Address (for pickup arrangement)</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="E.g., Blk 456, Jurong West St 41, #12-34, Singapore 640456"
          />
        </div>
        {/* Add NRIC field */}
        <div className="form-group">
          <label>NRIC *</label>
          <input
            type="text"
            name="nric"
            value={formData.nric}
            onChange={handleChange}
            placeholder="e.g., S1234567A"
            required
          />
          {errors.nric && <div className="error">{errors.nric}</div>}
        </div>
        <div className="form-group">
          <label>Pet's Name *</label>
          <input
            type="text"
            name="petName"
            value={formData.petName}
            onChange={handleChange}
            required
          />
          {errors.petName && <div className="error">{errors.petName}</div>}
        </div>
        <div className="form-group">
          <label>Pet Type *</label>
          <select name="petType" value={formData.petType} onChange={handleChange} required>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
          </select>
        </div>
        <div className="form-group">
          <label>Breed (if known)</label>
          <input
            type="text"
            name="petBreed"
            value={formData.petBreed}
            onChange={handleChange}
            placeholder="e.g., Shih Tzu, Tabby"
          />
        </div>
        <div className="form-group">
          <label>Approximate Age</label>
          <input
            type="text"
            name="petAge"
            value={formData.petAge}
            onChange={handleChange}
            placeholder="e.g., 2 years"
          />
        </div>
        <div className="form-group">
          <label>Reason for Surrender *</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Please be honest – this helps us care for your pet better."
            required
          />
          {errors.reason && <div className="error">{errors.reason}</div>}
        </div>
        <div className="form-group">
          <label>Known Health or Behavioral Issues (optional)</label>
          <textarea
            name="healthIssues"
            value={formData.healthIssues}
            onChange={handleChange}
            placeholder="e.g., allergic, diabetic, scared of loud noises"
          />
        </div>
        <div className="form-actions">
          <button type="submit">Submit Surrender Request</button>
        </div>
      </form>
    </div>
  );
};

export default SurrenderForm;