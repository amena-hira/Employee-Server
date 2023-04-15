const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const port = process.env.port || 5000;

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "employee",
})

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getEmployee', async (req, res) => {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const sql = 'SELECT * from employee ORDER BY id DESC LIMIT ? OFFSET ?';
    db.query(sql, [size, page * size], (err, result) => {
        const sql = "SELECT COUNT(*) as total_count FROM employee";
        db.query(sql, (err, count) => {
            res.send({ result, count })
        })
    })
})
app.get('/getEmployee/:id', async (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * from employee where id = ?";
    db.query(sql, id, (err, result) => {
        res.send(result)
    })
})

app.delete('/deleteEmployee/:id', async (req, res) => {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const id = req.params.id;
    const sql = "DELETE FROM employee where id = ?";
    db.query(sql, id, (err, result) => {
        const sql = 'SELECT * from employee ORDER BY id DESC LIMIT ? OFFSET ?';
        db.query(sql, [size, page * size], (err, result) => {
            console.log(result);
            const sql = "SELECT COUNT(*) as total_count FROM employee";
            db.query(sql, (err, count) => {
                res.send({ result, count })
            })
        })
    })
})

app.put('/editEmployee/:id', async (req, res) => {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    console.log(page, size);
    const id = req.params.id;
    const name = req.body.name;
    const job_title = req.body.job_title;
    const phone = req.body.phone;
    const email = req.body.email;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const primary_contact = req.body.primary_contact;
    const primary_phone = req.body.primary_phone;
    const primary_relation = req.body.primary_relation;
    const secondary_contact = req.body.secondary_contact;
    const secondary_phone = req.body.secondary_phone;
    const secondary_relation = req.body.secondary_relation;
    const sql = "UPDATE employee SET name=?,job_title=?,phone=?,email=?,address=?,city=?,state=?,primary_contact=?,primary_phone=?,primary_relation=?,secondary_contact=?,secondary_phone=?,secondary_relation=? where id = ?";
    db.query(sql, [name, job_title, phone, email, address, city, state, primary_contact, primary_phone, primary_relation, secondary_contact, secondary_phone, secondary_relation, id], (err, result) => {
        const sql = 'SELECT * from employee ORDER BY id DESC LIMIT ? OFFSET ?';
        db.query(sql, [size, page * size], (err, result) => {
            console.log(result);
            const sql = "SELECT COUNT(*) as total_count FROM employee";
            db.query(sql, (err, count) => {
                res.send({ result, count })
            })
        })
    })
})
app.post('/addEmployee', async (req, res) => {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const name = req.body.name;
    const job_title = req.body.job_title;
    const phone = req.body.phone;
    const email = req.body.email;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const primary_contact = req.body.primary_contact;
    const primary_phone = req.body.primary_phone;
    const primary_relation = req.body.primary_relation;
    const secondary_contact = req.body.secondary_contact;
    const secondary_phone = req.body.secondary_phone;
    const secondary_relation = req.body.secondary_relation;
    const sqlInsert = "INSERT INTO employee (name,job_title,phone,email,address,city,state,primary_contact,primary_phone,primary_relation,secondary_contact,secondary_phone,secondary_relation) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(sqlInsert, [name, job_title, phone, email, address, city, state, primary_contact, primary_phone, primary_relation, secondary_contact, secondary_phone, secondary_relation], (err, result) => {
        const sql = 'SELECT * from employee ORDER BY id DESC LIMIT ? OFFSET ?';
        db.query(sql, [size, page * size], (err, result) => {
            console.log(result);
            const sql = "SELECT COUNT(*) as total_count FROM employee";
            db.query(sql, (err, count) => {
                res.send({ result, count })
            })
        })
    })
})

app.get('/', async (req, res) => {
    res.send("Employee Server is running");
})
app.listen(port, () => console.log(`Employee Server running on ${port}`))