const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var work = new Schema({
    employer: String,
    imageUrl: String,
    position: String,
    jobDescription: String,
    startDate: Date,
    endDate: Date,
    commendations: [
        {
            title: String,
            description: String,
            recurrance: Number
        }
    ]
});

module.exports = work;