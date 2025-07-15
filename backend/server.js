const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/connect');

// Connect To DataBase
connectDB();

require('dotenv').config()
const PORT = process.env.PORT;

// Routes
const UserRoute = require('./routes/UserRoute');


// middleware
app.use(cors());
app.use(express.json());
app.use(UserRoute)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})