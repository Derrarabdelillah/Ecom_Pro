const mongoose = require('mongoose');
// dotenv
require('dotenv').config()

const uri = process.env.URI

async function connectDB() {
    await mongoose.connect(uri);
}

module.exports = connectDB;
