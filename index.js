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
app.use(bodyParser.urlencoded({extended: true}));

app.get('/getEmployee',async(req,res)=>{
    const sqlInsert = "SELECT * from employee";
    db.query(sqlInsert,(err,result)=>{
        res.send(result)
    })
})

app.post('/addEmployee', async (req, res) => {
    console.log(req.body);
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
    db.query(sqlInsert,[name,job_title,phone,email,address,city,state,primary_contact,primary_phone,primary_relation,secondary_contact,secondary_phone,secondary_relation],(err,result)=>{
        console.log(result);
    })
})

app.get('/', async (req, res) => {
    res.send("Employee Server is running");
})
app.listen(port, () => console.log(`Employee Server running on ${port}`))