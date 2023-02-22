const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./src/db/connection');
const routes = require('./src/routes/userRoutes');

const app = express();
app.use(bodyParser.json());
const PORT = 8081;

app.use("/", routes)
app.use("/userlogin",require('./src/routes/authRoute'))

app.listen(PORT, ()=>{
    console.log("localhost:8081");
});