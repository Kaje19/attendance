const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); // Replaces bodyParser.json()
app.use(express.urlencoded({ extended: true })); // Replaces bodyParser.urlencoded()


// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'attendance'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM admin WHERE admin_Username = ? AND admin_Password = ?';
  db.query(query,[username, password], (err, results) => {
   if (err) {
      return res.status(500).send(err);
    }
    if (results.length > 0) {
       res.json({ success: true });
      } else {
        res.json({ success: false });
      }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
