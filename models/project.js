const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var project = new Schema({
    title: String,
    description: String,
    role: String,
    mediaFolder: String,
    media: [],
    links: [String],
    tags: [String]
});

module.exports = project;