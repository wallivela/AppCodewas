import React, { useContext, useEffect, useState } from 'react';
import DepositContext from '../../context/DepositContext';
import './ReturnDelivery.css';

const ReturnDelivery = () => {
  const { addInvoice, removeInvoice } = useContext(DepositContext);
  const [data, setData] = useState([]);
  const [factura, setFactura] = useState('');
  const [selectedData, setSelectedData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/facturas');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        if (!Array.isArray(jsonData)) {
          throw new Error('Data is not an array');
        }
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    setFactura(event.target.value);
  };

  const handleSearch = () => {
    if (Array.isArray(data)) {
      const foundData = data.find(item => item.factura === factura);
      if (foundData) {
        setSelectedData(prevSelectedData => [...prevSelectedData, foundData]);
        addInvoice(foundData.factura, foundData.cliente, foundData.vlr_factura);
      } else {
        alert('Factura no encontrada');
      }
    } else {
      console.error('Error: data is not an array');
    }
    setFactura('');
  };

  const handleDelete = (facturaToDelete) => {
    setSelectedData(prevSelectedData => prevSelectedData.filter(item => item.factura !== facturaToDelete));
    removeInvoice(selectedData.find(item => item.factura === facturaToDelete));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="return-delivery">
      <h2>Facturas de Devolución</h2>
      <div>
        <input
          type="text"
          value={factura}
          onChange={handleInputChange}
          placeholder="Ingrese número de factura"
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      {selectedData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Eliminar</th>
              <th>Cliente</th>
              <th>Nombre</th>
              <th>Vlr Factura</th>
            </tr>
          </thead>
          <tbody>
            {selectedData.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => handleDelete(item.factura)}
                  />
                </td>
                <td>{item.cliente}</td>
                <td>{item.nombre}</td>
                <td>${item.vlr_factura}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReturnDelivery;
