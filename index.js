const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
//const dotenv = require('dotenv').config();

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded());

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

const connection = mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {useUnifiedTopology:true,useNewUrlParser:true}, async (err) => {
    if(err) {
        console.log(`error: ${err.message}`);
    }
    else {
        console.log(`connection established to MongoDB`);
    }
});

//schemas and models
const classSchema = require('./models/class');
const languageSchema = require('./models/language');
const workSchema = require('./models/work');
var language = mongoose.model("language",languageSchema);
var classData = mongoose.model("classData",classSchema);
var work = mongoose.model("work",workSchema);

//routes
const usersRoute = require('./routes/users');
const contactRoute = require('./routes/contact');
const reposRoute = require('./routes/repos');
const classesRoute = require('./routes/classes');
const languagesRoute = require('./routes/languages');
const workRoute = require("./routes/work");

//middleware (routes)
app.use('/users',usersRoute);
app.use('/contact',contactRoute);
app.use('/repos',reposRoute);
app.use('/classes',classesRoute);
app.use('/languages',languagesRoute);
app.use('/work',workRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});