const express = require('express');
const cors = require('cors');
const port = process.env.port || 5000;

const app = express();

app.use(cors());
app.use(express.json());


app.get('/', async(req,res)=>{
    res.send("Employee Server is running");
})
app.listen(port, () => console.log(`Employee Server running on ${port}`))