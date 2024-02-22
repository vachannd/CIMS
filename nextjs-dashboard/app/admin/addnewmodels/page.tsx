'use client'
import React, { useState } from 'react';

const AddCarModelPage = () => {
  const [modelData, setModelData] = useState({
    model_name: '',
    price: '',
    year: '',
    description: '',
    quantity_available: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModelData({
      ...modelData,
      [name]: value,
    });
  };

  const handleAddCarModel = () => {
    // Perform validation and call the backend to add a new car model
    fetch('http://localhost:8000/api/addCarModel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token
      },
      body: JSON.stringify(modelData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Car model added successfully!');
          // Optionally, redirect or perform other actions after success
        } else {
          console.error('Error adding car model:', response.status);
        }
      })
      .catch((error) => console.error('Error adding car model:', error));
  };

  return (
    <div>
      <h1>Add Car Model</h1>
      <div>
        <label>Model Name:</label>
        <input
          type="text"
          name="model_name"
          value={modelData.model_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={modelData.price}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Year:</label>
        <input
          type="number"
          name="year"
          value={modelData.year}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={modelData.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Quantity Available:</label>
        <input
          type="number"
          name="quantity_available"
          value={modelData.quantity_available}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddCarModel}>Add Car Model</button>
    </div>
  );
};

export default AddCarModelPage;
