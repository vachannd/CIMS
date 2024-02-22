'use client'
import React, { useState, useEffect } from 'react';
import { Car } from '../../lib/definitions';

const Page = () => {
  const [carModels, setCarModels] = useState<Car[]>([]);
  const [selectedCarModel, setSelectedCarModel] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/getCarModels')
      .then((response) => response.json())
      .then((data) => setCarModels(data))
      .catch((error) => console.error('Error fetching car models:', error));
  }, []);

  const handleAddMoreCars = () => {
    fetch('http://localhost:8000/api/addMoreCars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        car_model_id: selectedCarModel,
        quantity: parseInt(quantity, 10),
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Cars added successfully!');
        } else {
          console.error('Error adding cars:', response.status);
        }
      })
      .catch((error) => console.error('Error adding cars:', error));
  };

  return (
    <div>
      <h1>Add More Cars</h1>
      <div>
        <label>Select Car Model:</label>
        <select
          value={selectedCarModel}
          onChange={(e) => setSelectedCarModel(e.target.value)}
        >
          <option value="" disabled>Select a car model</option>
          {carModels.map((car) => (
            <option key={car.id} value={car.id}>
              {car.model_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <button onClick={handleAddMoreCars}>Add More Cars</button>
    </div>
  );
};

export default Page;
