'use client'
import React, { useEffect, useState } from 'react';
import { PurchaseOrder } from '../../lib/definitions';

const PurchaseOrdersPage = () => {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/getAllPurchases', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setPurchaseOrders(data);
      } catch (error) {
        console.error('Error fetching purchase orders:', error);
      }
    };

    fetchPurchaseOrders();
  }, []);

  return (
    <div>
      <h1>All Purchase Orders</h1>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {purchaseOrders.map((order) => (
          <li key={order.id} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <p>User: {order.user_name}</p>
            <p>Car Model: {order.car_model_name}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Total Price: {order.total_price}</p>
            <p>Purchase Date: {new Date(order.purchase_date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default PurchaseOrdersPage;
