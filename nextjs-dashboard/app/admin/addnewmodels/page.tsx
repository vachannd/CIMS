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
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModelData({
      ...modelData,
      [name]: value,
    });
  };

  const handleAddCarModel = () => {
    fetch('http://localhost:8000/api/addCarModel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(modelData),
    })
      .then((response) => {
        if (response.ok) {
          setErrorMessage('');
          setSuccessMessage('Car model added successfully!');
        } else {
          setSuccessMessage('');
          setErrorMessage('Error adding car model.');
          console.error('Error adding car model:', response.status);
        }
      })
      .catch((error) => console.error('Error adding car model:', error));
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Add Car Model</h1>
      <div style={{ margin: '10px' }}>
        <label>Model Name:</label>
        <input
          type="text"
          name="model_name"
          value={modelData.model_name}
          onChange={handleInputChange}
        />
      </div>
      <div style={{ margin: '10px' }}>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={modelData.price}
          onChange={handleInputChange}
        />
      </div>
      <div style={{ margin: '10px' }}>
        <label>Year:</label>
        <input
          type="number"
          name="year"
          value={modelData.year}
          onChange={handleInputChange}
        />
      </div>
      <div style={{ margin: '10px' }}>
        <label>Description:</label>
        <textarea
          name="description"
          value={modelData.description}
          onChange={handleInputChange}
        />
      </div>
      <div style={{ margin: '10px' }}>
        <label>Quantity Available:</label>
        <input
          type="number"
          name="quantity_available"
          value={modelData.quantity_available}
          onChange={handleInputChange}
        />
      </div>
      <button
        onClick={handleAddCarModel}
        style={{
          display: 'inline-block',
          margin: '10px',
          padding: '10px',
          borderRadius: '5px',
          backgroundColor: '#007bff',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        Add Car Model
      </button>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
  
};

export default AddCarModelPage;
