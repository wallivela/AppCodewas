import React, { useContext, useEffect, useState } from 'react';
import DepositContext from '../../context/DepositContext';
import './ProductReturn.css';
import { FaTrash } from 'react-icons/fa';

const ProductReturn = () => {
  const { addReturnedProduct, removeReturnedProduct, returnedProducts } = useContext(DepositContext);
  const [data, setData] = useState([]);
  const [factura, setFactura] = useState('');
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
      const foundData = data.filter(item => item.factura === factura);
      if (foundData.length > 0) {
        foundData.forEach(item => {
          addReturnedProduct(item.factura, item.nombre_producto, item.vlr_con_iva);
        });
      } else {
        alert('Factura no encontrada');
      }
    } else {
      console.error('Error: data is not an array');
    }
    setFactura('');
  };

  const handleDelete = (factura, nombre_producto) => {
    removeReturnedProduct(factura, nombre_producto);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-return">
      <h2>Devoluciones Parciales</h2>
      <div>
        <input
          type="text"
          value={factura}
          onChange={handleInputChange}
          placeholder="Ingrese número de factura"
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      {returnedProducts.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Eliminar</th>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {returnedProducts.map((item, index) => (
              <tr key={index}>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(item.invoiceNumber, item.productName)}
                  >
                    <FaTrash />
                  </button>
                </td>
                <td>{item.invoiceNumber}</td>
                <td>{item.productName}</td>
                <td>${item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductReturn;