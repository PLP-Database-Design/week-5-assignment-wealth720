const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Replace with your MySQL username
    password: 'password',  // Replace with your MySQL password
    database: 'hospital_db'  // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// 1. Retrieve all patients
app.get('/patients', (req, res) => {
    const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// 2. Retrieve all providers
app.get('/providers', (req, res) => {
    const sql = 'SELECT first_name, last_name, provider_specialty FROM providers';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// 3. Filter patients by First Name
app.get('/patients/:first_name', (req, res) => {
    const firstName = req.params.first_name;
    const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
    db.query(sql, [firstName], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// 4. Retrieve all providers by their specialty
app.get('/providers/specialty/:specialty', (req, res) => {
    const specialty = req.params.specialty;
    const sql = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
    db.query(sql, [specialty], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
