'use client'
import React, { useEffect, useState } from 'react';
import { Car } from '../lib/definitions';


const Page: React.FC = () => {
    const [username, setUsername] = useState('');
    const [latestCars, setLatestCars] = useState<Car[]>([]);

    const decodeToken = (token: string) => {
        const encodedPayload = token.split('.')[1];
        const decodedPayload = atob(encodedPayload);
        const parsedPayload = JSON.parse(decodedPayload);
        return parsedPayload;
    };

    useEffect(() => {
        const fetchLatestCars = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
            const decodedToken = decodeToken(token);
            const userUsername = decodedToken.name;
            setUsername(userUsername);

            const response = await fetch('http://localhost:8000/api/getLatestCars', {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
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
        <p>User Dashboard, {username && `Hello, ${username}!`}</p>
        <br/>
        <p>Latest Cars: </p>
        <br/>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {latestCars.map((car) => (
            <li key={car.id} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <p>Model Name: {car.model_name}</p>
                <p>Price: {car.price}</p>
                <p>Year: {car.year}</p>
                <p>Description: {car.description}</p>
                <p>Quantity Available: {car.quantity_available}</p>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default Page;
