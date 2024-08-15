import React, { createContext, useState } from 'react';

const DepositContext = createContext();

export const DepositProvider = ({ children }) => {
  const [deposits, setDeposits] = useState([]);
  const [cash, setCash] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [returnedProducts, setReturnedProducts] = useState([]);

  // Funciones para manejar depósitos
  const addDeposit = (denomination, amount) => {
    setDeposits(prevDeposits => [...prevDeposits, { denomination, amount }]);
  };

  const removeDeposit = (index) => {
    setDeposits(prevDeposits => prevDeposits.filter((_, i) => i !== index));
  };

  // Funciones para manejar efectivo
  const addCash = (denomination, amount) => {
    setCash(prevCash => [...prevCash, { denomination, amount, total: denomination * amount }]);
  };

  const removeCash = (index) => {
    setCash(prevCash => prevCash.filter((_, i) => i !== index));
  };

  // Funciones para manejar facturas
  const addInvoice = (invoiceNumber, client, amount) => {
    setInvoices(prevInvoices => [...prevInvoices, { invoiceNumber, client, amount }]);
  };

  const removeInvoice = (index) => {
    setInvoices(prevInvoices => prevInvoices.filter((_, i) => i !== index));
  };

  // Funciones para manejar devoluciones parciales de productos
  const addReturnedProduct = (invoiceNumber, productName, amount) => {
    setReturnedProducts(prevProducts => [
      ...prevProducts,
      { invoiceNumber, productName, amount: parseFloat(amount) }
    ]);
  };

  const removeReturnedProduct = (invoiceNumber, productName) => {
    setReturnedProducts(prevProducts => 
      prevProducts.filter(product =>
        !(product.invoiceNumber === invoiceNumber && product.productName === productName)
      )
    );
  };

  // Funciones para calcular los totales
  const getTotalDeposits = () => {
    return deposits.reduce((total, deposit) => total + deposit.amount, 0);
  };

  const getTotalCash = () => {
    return cash.reduce((total, cashItem) => total + cashItem.total, 0);
  };

  const getTotalInvoices = () => {
    return invoices.reduce((total, invoice) => total + invoice.amount, 0);
  };

  const getTotalReturnedProducts = () => {
    return returnedProducts.reduce((total, product) => total + product.amount, 0);
  };

  return (
    <DepositContext.Provider
      value={{
        deposits,
        addDeposit,
        removeDeposit,
        cash,
        addCash,
        removeCash,
        invoices,
        addInvoice,
        removeInvoice,
        returnedProducts,
        addReturnedProduct,
        removeReturnedProduct,
        getTotalDeposits,
        getTotalCash,
        getTotalInvoices,
        getTotalReturnedProducts
      }}
    >
      {children}
    </DepositContext.Provider>
  );
};

export default DepositContext;