import React, { useContext, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import DepositContext from '../../context/DepositContext';
import { TextField, MenuItem, Button, Container, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './DepositDetails.css';

const validationSchema = Yup.object({
  denomination: Yup.string().required('Requerido'),
  amount: Yup.number().required('Requerido').positive('Debe ser un número positivo'),
});

const denominations = [
  { label: 'Billetes: $2.000', value: 2000 },
  { label: 'Billetes: $5.000', value: 5000 },
  { label: 'Billetes: $10.000', value: 10000 },
  { label: 'Billetes: $20.000', value: 20000 },
  { label: 'Billetes: $50.000', value: 50000 },
  { label: 'Billetes: $100.000', value: 100000 },
  { label: 'Monedas: $50', value: 50 },
  { label: 'Monedas: $100', value: 100 },
  { label: 'Monedas: $200', value: 200 },
  { label: 'Monedas: $500', value: 500 },
];

const DepositDetails = () => {
  const { cash, addCash, removeCash } = useContext(DepositContext);
  const [rows, setRows] = useState([]);

  const handleDelete = (index) => {
    removeCash(index);
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  return (
    <Container className="deposit-details">
      <h2>Discriminación de Efectivo</h2>
      <Formik
        initialValues={{ denomination: '', amount: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const total = values.denomination * values.amount;
          addCash(values.denomination, values.amount);
          setRows([...rows, { denomination: values.denomination, amount: values.amount, total }]);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              select
              name="denomination"
              label="Denominación"
              fullWidth
              variant="outlined"
              margin="normal"
              helperText={errors.denomination && touched.denomination && errors.denomination}
              error={Boolean(errors.denomination && touched.denomination)}
            >
              {denominations.map((denomination) => (
                <MenuItem key={denomination.value} value={denomination.value}>
                  {denomination.label}
                </MenuItem>
              ))}
            </Field>
            <Field
              as={TextField}
              type="number"
              name="amount"
              label="Cantidad"
              fullWidth
              variant="outlined"
              margin="normal"
              helperText={errors.amount && touched.amount && errors.amount}
              error={Boolean(errors.amount && touched.amount)}
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
              Añadir fila
            </Button>
          </Form>
        )}
      </Formik>
      <table>
        <thead>
          <tr>
            <th>Denominación</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {cash.map((row, index) => (
            <tr key={index}>
              <td>{denominations.find((d) => d.value === row.denomination).label}</td>
              <td>{row.amount}</td>
              <td>${row.total}</td>
              <td>
                <IconButton onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default DepositDetails;
