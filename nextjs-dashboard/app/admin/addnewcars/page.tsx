'use client'
import React, { useState, useEffect } from 'react';
import { Car } from '../../lib/definitions';

const Page = () => {
  const [carModels, setCarModels] = useState<Car[]>([]);
  const [selectedCarModel, setSelectedCarModel] = useState('');
  const [quantity, setQuantity] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchCarModels = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/getCarModels', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          Array.isArray(data) && setCarModels(data);
        }
      } catch (error) {
        console.error('Error fetching car models:', error);
      }
    };

    fetchCarModels();
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
          setSuccessMessage('Cars added successfully!');
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
          {Array.isArray(carModels) &&
            carModels.map((car) => (
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
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default Page;
