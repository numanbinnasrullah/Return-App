
'use client'
import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

const BarcodeGenerator = ({ orderNumber }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, orderNumber, {
        format: 'CODE128',
      });
    }
  }, [orderNumber]);

  return <svg ref={barcodeRef}></svg>;
};

export default BarcodeGenerator;
