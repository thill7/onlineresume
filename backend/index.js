const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded());

const connection = mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {useUnifiedTopology:true,useNewUrlParser:true}, async (err) => {
    if(err) {
        console.log(`error: ${err.message}`);
    }
    else {
        console.log(`connection established to MongoDB`);
    }
});

const classSchema = require('./models/class');
var classData = mongoose.model("classData",classSchema);

//routes
const usersRoute = require('./routes/users');
const contactRoute = require('./routes/contact');
const reposRoute = require('./routes/repos');
const classesRoute = require('./routes/classes');

app.use('/users',usersRoute);
app.use('/contact',contactRoute);
app.use('/repos',reposRoute);
app.use('/classes',classesRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});