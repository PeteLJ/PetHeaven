// src/data/pets.js
import { HDB_APPROVED_BREEDS } from '../utils/hdbDogs.js';

const catList = [
  { id: 1, name: "Luna", age: "2 years", gender: "Female", breed: "Domestic Shorthair", fee: 120 },
  { id: 2, name: "Milo", age: "1 year", gender: "Male", breed: "Tabby", fee: 100 },
  { id: 3, name: "Chloe", age: "3 years", gender: "Female", breed: "Siamese", fee: 180 },
  { id: 4, name: "Leo", age: "4 years", gender: "Male", breed: "Maine Coon", fee: 200 },
  { id: 5, name: "Nala", age: "2 years", gender: "Female", breed: "Ragdoll", fee: 190 },
  { id: 6, name: "Tiger", age: "1.5 years", gender: "Male", breed: "Bengal", fee: 170 },
  { id: 7, name: "Simba", age: "3 years", gender: "Male", breed: "Sphynx", fee: 160 },
  { id: 8, name: "Bella", age: "5 years", gender: "Female", breed: "British Shorthair", fee: 140 },
  { id: 9, name: "Oreo", age: "2 years", gender: "Male", breed: "Scottish Fold", fee: 150 },
  { id: 10, name: "Mochi", age: "1 year", gender: "Female", breed: "Abyssinian", fee: 130 },
  { id: 11, name: "Sushi", age: "4 years", gender: "Male", breed: "Russian Blue", fee: 160 },
  { id: 12, name: "Whiskers", age: "6 years", gender: "Female", breed: "Persian", fee: 180 }
];

const dogList = [
  { id: 13, name: "Bear", age: "3 years", gender: "Male", breed: "Poodle (Toy)", fee: 120 },
  { id: 14, name: "Daisy", age: "2 years", gender: "Female", breed: "Shih Tzu", fee: 100 },
  { id: 15, name: "Rocky", age: "4 years", gender: "Male", breed: "Chihuahua", fee: 90 },
  { id: 16, name: "Bailey", age: "1.5 years", gender: "Female", breed: "Maltese", fee: 130 },
  { id: 17, name: "Max", age: "2 years", gender: "Male", breed: "Pomeranian", fee: 140 },
  { id: 18, name: "Lucy", age: "3 years", gender: "Female", breed: "Cavalier King Charles Spaniel", fee: 150 },
  { id: 19, name: "Charlie", age: "5 years", gender: "Male", breed: "Miniature Schnauzer", fee: 110 },
  { id: 20, name: "Lola", age: "2 years", gender: "Female", breed: "Dachshund", fee: 100 },
  { id: 21, name: "Duke", age: "1 year", gender: "Male", breed: "Jack Russell Terrier", fee: 90 },
  { id: 22, name: "Sadie", age: "4 years", gender: "Female", breed: "Boston Terrier", fee: 120 },
  { id: 23, name: "Toby", age: "3 years", gender: "Male", breed: "Papillon", fee: 130 },
  { id: 24, name: "Buddy", age: "2 years", gender: "Male", breed: "Golden Retriever", fee: 250 }
];

export const availablePets = [
  // Map catList to pet objects
  ...catList.map(cat => ({
    ...cat,
    type: "cat",
    isHDBApproved: true,
    description: `${cat.name} is a healthy, vaccinated cat ready for a loving home. Great with families and individuals.`
  })),
  // Map dogList to pet objects
  ...dogList.map(dog => {
    const isHDB = HDB_APPROVED_BREEDS.has(dog.breed);
    let desc;
    if (isHDB) {
      desc = `${dog.name} is calm, trained, and suitable for HDB living. Fully vaccinated and microchipped.`;
    } else {
      desc = `${dog.name} is energetic and requires a private or condo home with space. Great with active families.`;
    }
    return {
      ...dog,
      type: "dog",
      isHDBApproved: isHDB,
      description: desc
    };
  })
];