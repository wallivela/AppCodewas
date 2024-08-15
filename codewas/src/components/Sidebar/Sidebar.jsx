// src/components/Sidebar/Sidebar.jsx

import React from 'react';
import './Sidebar.css';

const Sidebar = ({ setActiveComponent }) => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li onClick={() => setActiveComponent('WorkSheet')}>Worksheet</li>
        <li onClick={() => setActiveComponent('CashDeposit')}>Cash Deposit</li>
        <li onClick={() => setActiveComponent('DepositDetails')}>Deposit Details</li>
        <li onClick={() => setActiveComponent('ReturnDelivery')}>Return Delivery</li>
        <li onClick={() => setActiveComponent('ProductReturn')}>Product Return</li>
        <li onClick={() => setActiveComponent('Summary')}>Summary</li>
      </ul>
    </div>
  );
};

export default Sidebar;
