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
      <ul>
        {purchaseOrders.map((order) => (
          <li key={order.id}>
            <p>User: {order.user_name}</p>
            <p>Car Model: {order.car_model_name}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Total Price: {order.total_price}</p>
            <p>Purchase Date: {order.purchase_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseOrdersPage;
