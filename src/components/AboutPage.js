// src/components/AboutPage.js
import React from 'react';
import '../styles/AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About Pet Heaven</h1>
        <p>Our mission, vision, and commitment to animal welfare in Singapore.</p>
      </section>

      <section className="about-content">
        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            Founded in 2015, Pet Heaven began as a small group of volunteers passionate about animal welfare.
            Today, we have rescued over 500 cats and dogs and found them loving homes. Our mission is to end
            pet abandonment and promote responsible pet ownership in Singapore.
          </p>

          <h2>Our Team</h2>
          <p>
            We are a team of dedicated volunteers, veterinarians, and animal lovers who work tirelessly to
            care for abandoned pets. From medical care to adoption counseling, every step is taken with love and compassion.
          </p>

          <div className="team-photo-container">
            <div
              className="team-photo"
              role="img"
              aria-label="The Pet Heaven Team"
            ></div>
          </div>
          
          <h2>Our Facilities</h2>
          <p>
            Our shelter provides a safe and nurturing environment for cats and dogs. We offer medical care,
            behavioral training, and socialization to prepare them for their forever homes.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;