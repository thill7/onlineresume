const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

var app = express();

app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});