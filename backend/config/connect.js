const mongoose = require('mongoose');
require('dotenv').config();

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const db = process.env.DB;

// const uri = `mongodb+srv://${username}:${password}@cluster0.ghsi5dc.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`;
const uri = process.env.URI


function connectDB() {
    mongoose.connect(uri);
}

module.exports = connectDB;
