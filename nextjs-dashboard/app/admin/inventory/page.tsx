'use client'
import React, { useEffect, useState } from 'react';
import { Car } from '../lib/definitions';

const Page: React.FC = () => {
  const [latestCars, setLatestCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchLatestCars = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        if (token) {
          const response = await fetch('http://localhost:8000/api/getLatestCars', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          console.log(data);
          setLatestCars(data);
        }
      } catch (error) {
        console.error('Error fetching latest cars:', error);
      }
    };

    fetchLatestCars();
  }, []);

  return (
    <div>
      <p>Car Inventory: </p>
      <br/>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {latestCars.map((car) => (
          <li key={car.id} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <p>Model Name: {car.model_name}</p>
            <p>Price: {car.price}</p>
            <p>Year: {car.year}</p>
            <p>Year: {car.year}</p>
            <p>Description: {car.description}</p>
            <p>Quantity Available: {car.quantity_available}</p>
            <p>Is Active: {car.is_active}</p>
            <p>Created At: {new Date(car.created_at).toLocaleDateString()}</p>
            <p>Updated At: {new Date(car.updated_at).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
