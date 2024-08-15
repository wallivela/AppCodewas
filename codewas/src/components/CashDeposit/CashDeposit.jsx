import React, { useContext, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import DepositContext from '../../context/DepositContext';
import { TextField, MenuItem, Button, Container, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './CashDeposit.css';

const validationSchema = Yup.object({
  denomination: Yup.string().required('Requerido'),
  amount: Yup.number().required('Requerido').positive('Debe ser un número positivo'),
});

const banks = [
  'Bancolombia',
  'Banco de Bogotá',
  'DAVIVIENDA',
  'BBVA Colombia',
  'Banco Popular',
  'Citibank Colombia',
  'Scotiabank Colpatria',
  'Banco Falabella',
  'Banco de Occidente',
  'Helm Bank',
];

const CashDeposit = () => {
  const { deposits, addDeposit, removeDeposit } = useContext(DepositContext);
  const [rows, setRows] = useState([]);

  const handleDelete = (index) => {
    removeDeposit(index);
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  return (
    <Container className="cash-deposit">
      <h2>Discriminación de Consignaciones</h2>
      <Formik
        initialValues={{ denomination: '', amount: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          addDeposit(values.denomination, values.amount);
          setRows([...rows, { denomination: values.denomination, amount: values.amount }]);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              select
              name="denomination"
              label="Banco"
              fullWidth
              variant="outlined"
              margin="normal"
              helperText={errors.denomination && touched.denomination && errors.denomination}
              error={Boolean(errors.denomination && touched.denomination)}
            >
              {banks.map((bank) => (
                <MenuItem key={bank} value={bank}>
                  {bank}
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
            <th>Banco</th>
            <th>Cantidad</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {deposits.map((row, index) => (
            <tr key={index}>
              <td>{row.denomination}</td>
              <td>${row.amount}</td>
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

export default CashDeposit;
