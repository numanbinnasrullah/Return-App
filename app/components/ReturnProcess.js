'use client'
import React, { useState } from 'react';

const ReturnProcess = ({ orders }) => {
  const [scannedOrder, setScannedOrder] = useState(null);

  const handleScan = (e) => {
    const barcode = e.target.value;
    const order = orders.find(o => o.orderNumber === barcode);
    if (order) {
      setScannedOrder(order);
    }
  };

  return (
    <div className="p-4 border rounded shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4">Return Process</h2>
      <input
        type="text"
        placeholder="Scan barcode"
        onBlur={handleScan}
        className="p-2 border rounded mb-4 w-full"
      />
      {scannedOrder && (
        <div>
          <h3 className="text-lg font-semibold">Order Number: {scannedOrder.orderNumber}</h3>
          <p>Item: {scannedOrder.itemName}</p>
          <p>Quantity: {scannedOrder.itemQuantity}</p>
        </div>
      )}
    </div>
  );
};

export default ReturnProcess;
