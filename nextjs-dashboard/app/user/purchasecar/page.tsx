'use client'
import React, { useState, useEffect } from 'react';
import { Car } from '../../lib/definitions';


const PurchaseCarPage: React.FC = () => {
    const [quantity, setQuantity] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [carModels, setCarModels] = useState<Car[]>([]);
    const [selectedCarModel, setSelectedCarModel] = useState<Car | null>(null);

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
            setCarModels(data);
            }
        } catch (error) {
            console.error('Error fetching car models:', error);
        }
        };

        fetchCarModels();
    }, []);

    const handlePurchase = async () => {
        try {
        if (!selectedCarModel) {
            setErrorMessage('Please select a car model.');
            return;
        }
    
        if (quantity < 1) {
            setErrorMessage('Quantity should be at least 1.');
            return;
        }
    
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/purchaseCar', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
            car_model_id: selectedCarModel.id,
            quantity: quantity,
            }),
        });
    
        if (response.ok) {
            setErrorMessage('');
            setSuccessMessage('Purchase successful!');
            console.log('Purchase successful!');
        } else {
            const data = await response.json();
            console.error('Error purchasing car:', );
            setSuccessMessage('');
            setErrorMessage(data.message);
        }
        } catch (error) {
        console.error('Error purchasing car:', error);
        setErrorMessage('Error purchasing car');
        }
    };

    return (
        <div>
        <h1>Purchase Car</h1>
        <label>Car Model:</label>
        <select
            value={selectedCarModel?.id || ''}
            onChange={(e) => {
            const selectedId = parseInt(e.target.value, 10);
            const selectedCar = carModels.find((car) => car.id === selectedId);
            setSelectedCarModel(selectedCar || null);
            }}
        >
            <option value="">Select Car Model</option>
            {carModels.map((car) => (
            <option key={car.id} value={car.id}>
                {car.model_name}
            </option>
            ))}
        </select>
        <br />
        <label>Quantity:</label>
        <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
        />
        <button onClick={handlePurchase} style={{ display: 'block', margin: '10px', padding: '10px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>Purchase Car</button>
        {errorMessage && <p>{errorMessage}</p>}
        {successMessage && <p>{successMessage}</p>}
        </div>
    );
    };

export default PurchaseCarPage;
