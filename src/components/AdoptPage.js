// src/components/AdoptPage.js
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { availablePets } from '../data/pets.js';
import AdoptPetCard from './AdoptPetCard.js';
import '../styles/AdoptPage.css';

const MIN_FEE = 50;
const MAX_FEE = 350;

const AdoptPage = () => {
  const [petType, setPetType] = useState('all');
  const [hdbFilter, setHdbFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([MIN_FEE, MAX_FEE]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const filteredPets = useMemo(() => {
    return availablePets.filter(pet => {
      if (petType !== 'all' && pet.type !== petType) return false;
      if (hdbFilter === 'hdb-only' && pet.type === 'dog' && !pet.isHDBApproved) return false;
      if (pet.fee < priceRange[0] || pet.fee > priceRange[1]) return false;
      return true;
    });
  }, [petType, hdbFilter, priceRange]);

  const handleMinChange = (e) => {
    const min = parseInt(e.target.value);
    setPriceRange([min, Math.max(min, priceRange[1])]);
  };

  const handleMaxChange = (e) => {
    const max = parseInt(e.target.value);
    setPriceRange([Math.min(max, priceRange[0]), max]);
  };

  const handleAdoptClick = () => {
    if (!user) {
      alert('You must be logged in to adopt a pet.');
      navigate('/login');
      return;
    }
  };

  return (
    <div className="adopt-page">
      <div className="adopt-header">
        <h1>Available Pets for Adoption</h1>
        <p>All pets are vaccinated, microchipped, and ready for a loving home in Singapore.</p>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Pet Type:</label>
          <select value={petType} onChange={(e) => setPetType(e.target.value)}>
            <option value="all">All Pets</option>
            <option value="cat">Cats Only</option>
            <option value="dog">Dogs Only</option>
          </select>
        </div>

        <div className="filter-group">
          <label>HDB Friendly:</label>
          <select value={hdbFilter} onChange={(e) => setHdbFilter(e.target.value)}>
            <option value="all">All Dogs</option>
            <option value="hdb-only">HDB-Approved Only</option>
          </select>
        </div>

        <div className="filter-group price-slider">
          <label>Fee: ${priceRange[0]} – ${priceRange[1]}</label>
          <div className="slider-container">
            <input
              type="range"
              min={MIN_FEE}
              max={MAX_FEE}
              value={priceRange[0]}
              onChange={handleMinChange}
            />
            <input
              type="range"
              min={MIN_FEE}
              max={MAX_FEE}
              value={priceRange[1]}
              onChange={handleMaxChange}
            />
          </div>
          <div className="slider-labels">
            <span>${MIN_FEE}</span>
            <span>${MAX_FEE}</span>
          </div>
        </div>
      </div>

      <p className="result-count">
        Showing {filteredPets.length} of {availablePets.length} pets
      </p>

      <div className="pets-grid">
        {filteredPets.length > 0 ? (
          filteredPets.map(pet => (
            <AdoptPetCard key={pet.id} pet={pet} onAdoptClick={handleAdoptClick} />
          ))
        ) : (
          <p className="no-pets">No pets match your filters. Try adjusting them!</p>
        )}
      </div>
    </div>
  );
};

export default AdoptPage;