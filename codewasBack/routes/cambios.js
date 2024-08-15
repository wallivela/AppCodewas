const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '8742', // Cambia esto por tu contraseña real
    database: 'appmakro',
    timezone: 'Z',
    ssl: false
});

// Ruta para actualizar un conductor
router.put('/conductores/:id', (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const query = 'UPDATE conductores SET nombre = ? WHERE id = ?';

    db.query(query, [nombre, id], (err, results) => {
        if (err) {
            console.error('Error updating conductor:', err);
            res.status(500).send('Error updating conductor');
            return;
        }
        res.status(200).send('Conductor actualizado exitosamente');
    });
});

// Ruta para obtener datos de una factura
router.get('/factura/:numero', (req, res) => {
    const { numero } = req.params;
    const query = 'SELECT cliente, Nombre, `Vlr Factura` FROM appmakro WHERE Factura = ?';

    db.query(query, [numero], (err, results) => {
        if (err) {
            console.error('Error fetching factura:', err);
            res.status(500).send('Error fetching factura');
            return;
        }
        res.status(200).json(results);
    });
});

// Ruta para obtener todos los conductores
router.get('/conductores', (req, res) => {
    const query = 'SELECT id, nombre FROM conductores';
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching conductores:', err);
        res.status(500).send('Error fetching conductores');
        return;
      }
      res.status(200).json(results);
    });
  });

module.exports = router;
