const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded());

//routes
const usersRoute = require('./routes/users');
const contactRoute = require('./routes/contact');

app.use('/users',usersRoute);
app.use('/contact',contactRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});