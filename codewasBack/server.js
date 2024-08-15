const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Conexión MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '8742',
    database: 'appmakro',
    timezone: 'Z',
    ssl: false
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL server.');
});

// Endpoint para autenticación de usuarios
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM conductores WHERE nombre = ? AND id = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (results.length > 0) {
            res.status(200).send('Authenticated');
        } else {
            res.status(401).send('Invalid username or password');
        }
    });
});

// Endpoint para procesar datos de facturas
app.get('/api/facturas', (req, res) => {
    const scriptPath = path.join(__dirname, 'scripts/process_facturas.py');
    exec(`python ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error}`);
            return res.status(500).send('Error processing data');
        }

        const jsonDataPath = path.join(__dirname, 'data/data.json');
        fs.readFile(jsonDataPath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading JSON file: ${err}`);
                return res.status(500).send('Error reading data');
            }

            res.json(JSON.parse(data));
        });
    });
});

// Usar el enrutador de `cambios.js`
const cambiosRouter = require('./routes/cambios');
app.use('/api', cambiosRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
