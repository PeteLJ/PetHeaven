// src/components/AdoptForm.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Form.css';

const AdoptForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth(); // Get logged-in user

  const [formData, setFormData] = useState({
    // Initialize with empty values or defaults
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    nric: '',
    petName: '',
    experience: ''
  });

  const [errors, setErrors] = useState({});

  // Get pet name from URL
  const urlParams = new URLSearchParams(location.search);
  const petNameFromUrl = urlParams.get('name') || 'a pet';

  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      // Redirect to login page if not logged in
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    // Pre-fill form data only if user exists and is available
    setFormData(prevData => ({
      ...prevData, // Keep any existing state values
      fullName: user.name || prevData.fullName,
      email: user.email || prevData.email,
      petName: petNameFromUrl // Update pet name from URL
    }));
  }, [user, navigate, location.pathname, petNameFromUrl]); // Add dependencies

  useEffect(() => {
    if (user && petNameFromUrl) { // Only run if user is logged in and URL param exists
      setFormData(prev => ({ ...prev, petName: petNameFromUrl }));
    }
  }, [user, petNameFromUrl]); // Depend on user and URL param

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Validate NRIC format
  const validateNRIC = (nric) => {
     const nricRegex = /^(S|T)\d{7}[A-Z]$/i;
     return nricRegex.test(nric);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Home address is required';
    if (!formData.nric.trim()) newErrors.nric = 'NRIC is required';
    else if (!validateNRIC(formData.nric)) newErrors.nric = 'Invalid NRIC format (e.g., S1234567A)';
    if (!formData.petName.trim()) newErrors.petName = 'Pet name is required';
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
      id: Date.now(), // ID generation
      type: 'adoption',
      petName: formData.petName,
      requesterName: formData.fullName,
      requesterEmail: formData.email,
      requesterPhone: formData.phone,
      requesterAddress: formData.address,
      requesterNRIC: formData.nric, // Include NRIC
      requesterExperience: formData.experience,
      status: 'Pending', // Default status for staff
      submittedAt: new Date().toISOString(),
      paymentStatus: 'Not Started',
      collectionConfirmed: false
    };

    // Store submission in localStorage
    const storedRequests = JSON.parse(localStorage.getItem('petRequests')) || [];
    storedRequests.push(submissionData);
    localStorage.setItem('petRequests', JSON.stringify(storedRequests));

    // Provide feedback to user
    alert(`Thank you! Your request to adopt ${formData.petName} has been submitted and is pending staff review.`);
    console.log('Adoption Form Submitted:', submissionData);

    // Redirect to home page after successful submission
    navigate('/');
  };

  if (!user) {
    return null;
  }

  // Render the form only if user is logged in and data is potentially pre-filled
  return (
    <div className="form-container">
      <h2>Request to Adopt {formData.petName}</h2>
      <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>
        Our team will contact you within 3 working days. <strong>Request is pending staff review.</strong>
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          {errors.fullName && <div className="error">{errors.fullName}</div>}
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
          <label>Home Address (include postal code) *</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="E.g., Blk 123, Clementi Ave 3, #04-56, Singapore 123456"
            required
          />
          {errors.address && <div className="error">{errors.address}</div>}
        </div>

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
          <label>Pet You Wish to Adopt *</label>
          <input
            type="text"
            name="petName"
            value={formData.petName}
            readOnly
            style={{ backgroundColor: '#f5f5f5' }}
          />
          {errors.petName && <div className="error">{errors.petName}</div>}
        </div>

        <div className="form-group">
          <label>Previous Experience with Pets (optional)</label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Tell us about your experience..."
          />
        </div>

        <div className="form-actions">
          <button type="submit">Submit Adoption Request</button>
        </div>
      </form>
    </div>
  );
};

export default AdoptForm;