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

//Login endpoint
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

//getEvents endpoint
app.get('/api/events', (req, res) => {
  const sql = 'SELECT * FROM events';
  db.query(sql, (err, results) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.json(results);
  });
});

//addEvent endpoint
app.post('/api/events', (req, res) => {
  const { name, venue, date, time } = req.body;
  const sql = 'INSERT INTO events (event_Name, event_Loc, event_Date, event_Time) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, venue, date, time], (err, result) => {
      if (err) {
        return res.status(500).send(body);
      }
      res.status(201).send('Event added.');
  });
});

//getStudents endpoint
app.get('/api/students', (req, res) => {
  const sql = 'SELECT * FROM students';
  db.query(sql, (err, results) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.json(results);
  });
});

// Get fined and unfined students
app.get('/api/students/fined', (req, res) => {
  const sql = "SELECT students.*, 'FINED' AS result FROM students WHERE (SELECT COUNT(events.event_ID) FROM events) != students.stud_Attend;";
  db.query(sql, (err, results) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.json(results);
  });
});

app.get('/api/students/unfined', (req, res) => {
  const sql = "SELECT students.*, 'UNFINED' AS result FROM students WHERE (SELECT COUNT(events.event_ID) FROM events) = students.stud_Attend;";
  db.query(sql, (err, results) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.json(results);
  });
});


//updateStudent endpoint
app.put('/api/students/:id', (req, res) => {
  const studentId = req.params.id;
  const { stud_Name, stud_Course, stud_yLevel, stud_Attend } = req.body;
  const sql = 'UPDATE students SET stud_Name = ?, stud_Course = ?, stud_yLevel = ?, stud_Attend = ? WHERE stud_ID = ?';
  db.query(sql, [stud_Name, stud_Course, stud_yLevel, stud_Attend, studentId], (err, result) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.status(200).send('Student information updated successfully.');
  });
});

//deleteStudent endpoint
app.delete('/api/students/:id', (req, res) => {
  const studentId = req.params.id;
  const sql = 'DELETE FROM students WHERE stud_ID = ?';
  db.query(sql, [studentId], (err, result) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.status(200).send('Student deleted successfully.');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
