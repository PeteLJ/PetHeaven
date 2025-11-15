// src/components/AdoptPetCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/AdoptPage.css';

const AdoptPetCard = ({ pet }) => {
  const { user, staff } = useAuth(); // Get both user and staff state
  const navigate = useNavigate(); // Get navigate function

  const handleAdoptClick = () => {
    if (staff) {
      // If staff is logged in
      alert('You are logged in as staff. Staff members cannot adopt pets.');
      return; // Do nothing
    }
    if (!user) {
      // If no regular user is logged in
      alert('You must be logged in to adopt a pet.');
      navigate('/login');
      return;
    }
    // If regular user is logged in, navigate to the form
    navigate(`/adopt/form?pet=${pet.id}&name=${encodeURIComponent(pet.name)}`);
  };

  return (
    <div className="adopt-pet-card">
      <div
        className={`pet-card-image pet-image-${pet.name.toLowerCase()}`}
        role="img"
        aria-label={pet.name}
      ></div>
      
      <div className="pet-details">
        <h3>{pet.name}</h3>
        <p><strong>Breed:</strong> {pet.breed}</p>
        <p><strong>Age:</strong> {pet.age} | <strong>Gender:</strong> {pet.gender}</p>

        {pet.type === 'dog' && (
          <span className={`hdb-badge ${pet.isHDBApproved ? 'approved' : 'not-approved'}`}>
            {pet.isHDBApproved ? '✅ HDB Approved' : '🏡 Private Home Only'}
          </span>
        )}

        <p className="fee">Adoption Fee: <strong>${pet.fee}</strong></p>
        <p className="pet-desc">{pet.description}</p>

        <button className="btn adopt-btn" onClick={handleAdoptClick}>
          Adopt Me ❤️
        </button>
      </div>
    </div>
  );
};

export default AdoptPetCard;