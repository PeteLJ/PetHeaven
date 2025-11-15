// src/components/GalleryPage.js
import React, { useState, useEffect } from 'react';
import '../styles/GalleryPage.css';

const ALL_NAMES = [
  "Luna", "Milo", "Coco", "Oliver", "Chloe", "Simba", "Bella", "Leo", "Nala", "Tiger",
  "Mochi", "Sushi", "Mei Mei", "Ah Boy", "Ah Girl", "Bubbles", "Nimbus", "Pebbles", "Cinnamon", "Pixel",
  "Waffles", "Muffin", "Stardust", "Peanut", "Maple", "Rusty", "Lucky", "Willow", "Scout", "Misty",
  "Rocket", "Daisy", "Oreo", "Sunny", "Tofu", "Biscuit", "Loki", "Molly", "Bear", "Cherry",
  "Shadow", "Pepper", "Gizmo", "Ziggy", "Mango", "Pippin", "Juniper", "Cosmo", "Honey", "Pumpkin",
  "Smokey", "Dexter", "Lily", "Max", "Ruby", "Charlie", "Lucy", "Jack", "Sadie", "Bailey",
  "Duke", "Rosie", "Rocky", "Buddy", "Zoe", "Toby", "Lola", "Maggie", "Cooper", "Finn",
  "Milo", "Luna", "Cleo", "Archie", "Ellie", "Winston", "Ginger", "Minnie", "Oscar", "Daisy",
  "Mochi", "Nala", "Bruno", "Lulu", "Teddy", "Izzy", "Rex", "Piper", "Louie", "Dixie",
  "Mochi", "Sushi", "Tempura", "Wasabi", "Matcha", "Durian", "Mango", "Lychee", "Coconut", "Pandan",
  "Bao", "Kopi", "Teh", "Milo", "Roti", "Prata", "Chilli", "Laksa", "Satay", "Bakar",
  "Noodle", "Rice", "Bento", "Sake", "Yuzu", "Miso", "Tofu", "Edamame", "Soba", "Udon",
  "Kiwi", "Papaya", "Mango", "Guava", "Rambutan", "Mangosteen", "Jackfruit", "Banana", "Apple", "Orange",
  "Lemon", "Lime", "Grape", "Berry", "Cherry", "Plum", "Peach", "Pear", "Fig", "Date",
  "Cashew", "Almond", "Pistachio", "Walnut", "Peanut", "Chestnut", "Hazelnut", "Macadamia", "Coconut", "Pecan",
  "Bolt", "Flash", "Spark", "Ember", "Flame", "Ash", "Coal", "Smoke", "Fog", "Mist",
  "Cloud", "Sky", "Rain", "Storm", "Thunder", "Lightning", "Snow", "Frost", "Ice", "Blizzard",
  "River", "Brook", "Creek", "Pond", "Lake", "Ocean", "Sea", "Wave", "Tide", "Coral",
  "Sandy", "Shell", "Pearl", "Jade", "Ruby", "Emerald", "Sapphire", "Topaz", "Amber", "Crystal",
  "Opal", "Diamond", "Goldie", "Silver", "Copper", "Bronze", "Platinum", "Titan", "Steel", "Iron",
  "Nova", "Orion", "Vega", "Lyra", "Aurora", "Comet", "Meteor", "Galaxy", "Stellar", "Solar",
];

// Fisher-Yates shuffle
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Get N unique random names
const getUniqueRandomNames = (count) => {
  if (count > ALL_NAMES.length) {
    console.warn(`Requested ${count} names, but only ${ALL_NAMES.length} available. Reusing names.`);
    return Array.from({ length: count }, (_, i) => ALL_NAMES[i % ALL_NAMES.length]);
  }
  return shuffleArray(ALL_NAMES).slice(0, count);
};

const GalleryPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCats = async () => {
    try {
      const res = await fetch('https://api.thecatapi.com/v1/images/search?limit=12');
      if (!res.ok) {
        throw new Error(`Cat API error: ${res.status}`);
      }
      const data = await res.json();
      return data.map(item => ({
        id: `cat-${item.id}`, // Use the API's ID
        name: `Cat ${getRandomName()}`, // Assign a random name
        image: item.url,
        type: 'cat'
      }));
    } catch (err) {
      console.error('Cat API error:', err);
      // Fallback
      return Array(12).fill(null).map((_, i) => ({
        id: `fallback-cat-${i}`,
        name: `Cat ${getRandomName()}`,
        image: `https://placekitten.com/300/200?image=${i + 1}`,
        type: 'cat'
      }));
    }
  };

  const fetchDogs = async () => {
    try {
      const res = await fetch('https://api.thedogapi.com/v1/images/search?limit=12');
      if (!res.ok) {
        throw new Error(`Dog API error: ${res.status}`);
      }
      const data = await res.json();
      return data.map(item => ({
        id: `dog-${item.id}`,
        name: `Dog ${getRandomName()}`, // Assign a random name
        image: item.url,
        type: 'dog'
      }));
    } catch (err) {
      console.error('Dog API error:', err);
      return Array(12).fill(null).map((_, i) => ({
        id: `fallback-dog-${i}`,
        name: `Dog ${getRandomName()}`,
        image: `https://placedog.net/300/200?random=${i}`,
        type: 'dog'
      }));
    }
  };

  const getRandomName = () => {
    return ALL_NAMES[Math.floor(Math.random() * ALL_NAMES.length)];
  };

  const loadGallery = async () => {
    setLoading(true);
    setError(null);
    try {
      const [cats, dogs] = await Promise.all([fetchCats(), fetchDogs()]);
      const allPets = [...cats, ...dogs];

      // Get unique names for all pets
      const names = getUniqueRandomNames(allPets.length);

      // Assign names to the pets
      const petsWithNames = allPets.map((pet, index) => ({
        ...pet,
        name: names[index]
      }));

      setPets(petsWithNames);
    } catch (err) {
      setError('Failed to load gallery. Please try again.');
      console.error("Gallery load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1>Pet Heaven Gallery</h1>
        <p>Meet some of our past and current rescues. Photos powered by live pet APIs!</p>
        <button className="btn refresh-btn" onClick={loadGallery} disabled={loading}>
          {loading ? 'Loading...' : '↺ Refresh Gallery'}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <div className="loading">Loading our adorable pets...</div>
      ) : (
        <div className="gallery-grid">
          {pets.map(pet => (
            <div key={pet.id} className="gallery-item">
              <img
                src={pet.image}
                alt={pet.name}
                onError={(e) => {
                  e.target.src = pet.type === 'cat'
                    ? 'https://placekitten.com/300/200'
                    : 'https://placedog.net/300/200';
                }}
              />
              <div className="gallery-label">
                <span className="pet-name">{pet.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;