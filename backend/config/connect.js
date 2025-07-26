const mongoose = require('mongoose');
// dotenv
require('dotenv').config()

const uri = process.env.URI

function connectDB() {
    mongoose.connect(uri);
}

module.exports = connectDB;
