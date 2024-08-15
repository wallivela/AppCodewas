import React, { useContext } from 'react';
import DepositContext from '../../context/DepositContext';
import './Summary.css';

const Summary = () => {
  const { getTotalDeposits, getTotalCash, getTotalInvoices, getTotalReturnedProducts } = useContext(DepositContext);

  const totalDeposits = getTotalDeposits();
  const totalCash = getTotalCash();
  const totalInvoices = getTotalInvoices();
  const totalReturnedProducts = getTotalReturnedProducts();
  const finalTotal = totalDeposits + totalCash + totalInvoices + totalReturnedProducts;

  return (
    <div className="summary">
      <h2>Resumen</h2>
      <div className="summary-item">
        <span>Total Consignaciones:</span>
        <span>${totalDeposits.toLocaleString()}</span>
      </div>
      <div className="summary-item">
        <span>Total Efectivo:</span>
        <span>${totalCash.toLocaleString()}</span>
      </div>
      <div className="summary-item">
        <span>Total Facturas Devueltas:</span>
        <span>${totalInvoices.toLocaleString()}</span>
      </div>
      <div className="summary-item">
        <span>Devoluciones Parciales de Productos:</span>
        <span>${totalReturnedProducts.toLocaleString()}</span>
      </div>
      <div className="summary-item final-total">
        <span>Total Final:</span>
        <span>${finalTotal.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default Summary;