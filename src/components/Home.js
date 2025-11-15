// src/components/Home.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const featuredPets = [
  {
    id: 1,
    name: "Luna",
    age: "2 years",
    gender: "Female",
    breed: "Domestic Shorthair",
    image: "/pets/luna.png",
    type: "cat"
  },
  {
    id: 2,
    name: "Buddy",
    age: "3 years",
    gender: "Male",
    breed: "Golden Retriever",
    image: "/pets/buddy.png",
    type: "dog"
  },
  {
    id: 3,
    name: "Milo",
    age: "1 year",
    gender: "Male",
    breed: "Tabby",
    image: "/pets/milo.png",
    type: "cat"
  },
  {
    id: 4,
    name: "Bailey",
    age: "4 years",
    gender: "Female",
    breed: "Maltese",
    image: "/pets/bailey.png",
    type: "dog"
  },
  {
    id: 5,
    name: "Chloe",
    age: "2 years",
    gender: "Female",
    breed: "Siamese",
    image: "/pets/chloe.png",
    type: "cat"
  },
  {
    id: 6,
    name: "Bear",
    age: "5 years",
    gender: "Male",
    breed: "Poodle (Toy)",
    image: "/pets/bear.png",
    type: "dog"
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredPets.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredPets.length - 1 : prev - 1));
  };

  // Auto slide carousel every 5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-text">
          <h1>Welcome to Pet Heaven</h1>
          <p>Singapore’s Safe Haven for Abandoned Pets<br />Your Love Is Their New Beginning!</p>
        </div>
        <div className="hero-cta">
          <Link to="/adopt" className="btn primary">Adopt a Pet</Link>
        </div>
      </section>

      <section className="impact-section">
        <div className="stat-card">
          <div className="stat-number">500+</div>
          <div className="stat-label">Animals Rescued</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">320+</div>
          <div className="stat-label">Found Loving Homes</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">85%</div>
          <div className="stat-label">Adoption Success Rate</div>
        </div>
      </section>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Pet Heaven is a non-profit charity dedicated to rescuing abandoned cats and dogs across Singapore.
          We provide medical care, shelter, and love while working tirelessly to find them permanent, caring homes.
          Through community support and responsible adoption, we strive to end pet abandonment and promote animal welfare.
        </p>
      </section>

      <section className="featured-pets-carousel">
        <h2>🐾 Featured Pets Looking for Homes</h2>
        <div className="carousel-container">
          <div className="carousel-wrapper">
            {featuredPets.map((pet, index) => (
              <div
                key={pet.id}
                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
              >
                <div
                  className={`carousel-pet-image pet-image-${pet.name.toLowerCase()}`}
                  role="img"
                  aria-label={pet.name}
                ></div>
                
                <div className="pet-info">
                  <h3>{pet.name}</h3>
                  <p><strong>Breed:</strong> {pet.breed}</p>
                  <p><strong>Age:</strong> {pet.age}</p>
                  <p><strong>Gender:</strong> {pet.gender}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-controls">
          <button className="carousel-btn prev" onClick={prevSlide}>&#10094;</button>

          <div className="carousel-indicators">
            {featuredPets.map((_, index) => (
              <span
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              ></span>
            ))}
          </div>

          <button className="carousel-btn next" onClick={nextSlide}>&#10095;</button>
        </div>

        <div className="view-all">
          <Link to="/adopt" className="btn outline">View All Available Pets</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;