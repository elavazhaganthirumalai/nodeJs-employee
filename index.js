const express=require("express"),
app=express(),
bodyparser = require('body-parser');
const cors = require('cors');

require("express-async-errors")

const db=require("./db"),
employeeRoutes=require("./controller/employee.controller")

app.use(cors())
app.use(bodyparser.json())
app.use("/api/v1/employees",employeeRoutes)
app.use((err, res) => {
    console.log(err)
    res.status(err.status || 500).send('Something went wrong!')
})

db.query("SELECT 1")
    .then((data) => {
        console.log('db connection  succeeded.')
        app.listen(8080,
            () => console.log('server started at 8080'))
    })
    .catch(err => console.log('db connection failed. \n' + err))

