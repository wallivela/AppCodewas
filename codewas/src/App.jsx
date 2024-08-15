import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import CashDeposit from './components/CashDeposit/CashDeposit';
import DepositDetails from './components/DepositDetails/DepositDetails';
import Summary from './components/Summary/Summary';
import { DepositProvider } from './context/DepositContext';
import SplashScreen from './components/SplashScreen/SplashScreen';
import ReturnDelivery from './components/ReturnDelivery/ReturnDelivery';
import ProductReturn from './components/ProductReturn/ProductReturn';
import WorkSheet from './components/WorkSheet/WorkSheet';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [summary, setSummary] = useState({
    Consignaciones: 0,
    Efectivo: 0,
    'Devolución Total': 0
  });

  const updateSummary = (type, value) => {
    setSummary(prevSummary => ({
      ...prevSummary,
      [type]: prevSummary[type] + parseFloat(value)
    }));
  };

  return (
    <DepositProvider>
      {isAuthenticated ? (
        <>
          <Navbar />
          <div className="container">
            <WorkSheet /> {/* Movido aquí, justo después del Navbar */}
            <CashDeposit />
            <DepositDetails />
            <ReturnDelivery updateSummary={updateSummary} />
            <ProductReturn updateSummary={updateSummary} />
            <Summary summary={summary} />
          </div>
          <Footer />
        </>
      ) : (
        <SplashScreen onLogin={() => setIsAuthenticated(true)} />
      )}
    </DepositProvider>
  );
}

export default App;