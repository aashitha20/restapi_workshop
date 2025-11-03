
const express = require('express');
require('dotenv').config();
const mysql = require('mysql2');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// create a connection to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME  
});

// connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
})



// sample route to test the server
app.get('/test', (req, res) => {
    res.send('Hello World!')
})

// user routes

app.post('/api/users', (req, res) => {
    const { name, email, phone_number } = req.body;
    const id = uuidv4(); // generate a unique id for the user
    const sql = 
    'INSERT INTO users (id, name, email, phone_number) VALUES (?, ?, ?, ?)';

    db.query(sql, [id, name, email, phone_number], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Error inserting user' });
        }

        const resultSql = 'SELECT * FROM users WHERE id = ?';
        db.query(resultSql, [id], (err, result) => {
            if(err) {
                console.error('Error fetching data:', err);
                res.status(500).json({ error: 'Error fetching data' });
                return;
            }
            console.log('Data updated successfully:', result);
            res.status(200).json({ data: result });
        })

    
    });

})

// update user

app.patch('/api/users/:userId', (req, res) => {
    const { userId } = req.params;

    // fetch user data from request body
    const fetchSql = 'SELECT * FROM users WHERE id = ?';
    db.query(fetchSql, [userId], (err, result) => {
        if (err) {  
            console.error('Error fetching user data:', err);
            res.status(500).json({ error: 'Error fetching user data' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        } 
        const user = result[0];

        const { name, email, phone_number } = req.body;
        const sql = 'UPDATE users SET name = ?, email = ?, phone_number = ? WHERE id = ?';

        const updatedUser = {
            name: name ?? user.name,
            email: email ?? user.email,
            phone_number: phone_number ?? user.phone_number
        }

        db.query(sql, [updatedUser.name, updatedUser.email, updatedUser.phone_number, userId], (err, result) => {
            if (err) {
                console.error('Error updating data:', err);
                res.status(500).json({ error: 'Error updating data' });
                return;
            }
            const resultSql = 'SELECT * FROM users WHERE id = ?';
            db.query(resultSql, [userId], (err, result) => {
                if(err) {
                    console.error('Error fetching data:', err);
                    res.status(500).json({ error: 'Error fetching data' });
                    return;
                }
                console.log('Data updated successfully:', result);
                res.status(200).json({ message: 'Data updated successfully', result });
            })
        })
    })
})

app.get('/api/users', (eq, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Error fetching data' });
            return;
        }
        console.log('Data fetched successfully:', result);
        res.status(200).json({ data: result });
    })

})

app.get('/api/users/:userId', (req, res) => {
    const { userId } = req.params;
    const sql = 'SELECT * FROM users WHERE id = ?';

    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Error fetching data' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        console.log('Data fetched successfully:', result);
        res.status(200).json({ data: result });
    })

})


app.delete('/api/users/:userId', (req, res) => {
    const { userId } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';

    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error('Error deleting data:', err);
            res.status(500).json({ error: 'Error deleting data' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        console.log('Data deleted successfully:', result);
        res.status(200).json({ message: 'Data deleted successfully' });
    })
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
