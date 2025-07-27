const express = require('express');
const app = express();
const cors = require('cors');
const cookieParse = require('cookie-parser');

// DB
const connectDB = require('./config/connect');
// Cloudinary
const connectToCloudinary  = require('./config/cloudinary');

// dotenv
require('dotenv').config()

const allowedOrigins = [
  "https://f-ecompro.onrender.com",
  "https://admin-ecompro.onrender.com"
];

// CORS Configuration
app.use(cors({
  origin: ['https://admin-ecompro.onrender.com', 'https://f-ecompro.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json()); // For JSON bodies
app.use(express.urlencoded({ extended: true })); // For form data
app.use(cookieParse());

// Connect To DataBase
connectDB();

// Connect To Cloudinary
connectToCloudinary()

// Routes
const UserRoute = require('./routes/UserRoute');
const ProductRoute = require('./routes/ProductRoute')
const CartRoute = require('./routes/CartRoute')
const OrderRoute = require('./routes/OrderRoute')

const PORT = process.env.PORT || 3000;


// api endpoints
app.use(UserRoute)
app.use('/api/product', ProductRoute);
app.use('/api/cart', CartRoute);
app.use('/api/orders', OrderRoute);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})