const express = require('express');
const app = express();
const cors = require('cors');
const cookieParse = require('cookie-parser');
const rateLimit = require('express-rate-limit')

// DB
const connectDB = require('./config/connect');
// Cloudinary
const connectToCloudinary  = require('./config/cloudinary');

// dotenv
require('dotenv').config()

// CORS Configuration
const corsOptions = {
  origin: ['https://admin-ecompro.onrender.com', 'https://f-ecompro.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add OPTIONS here
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // each IP can only make 5 requests to auth endpoints per windowMs
    message: {
      success: false,
      message: 'Too many login attempts from this IP, please try again after 15 minutes'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(cors(corsOptions));
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
app.use(UserRoute, authLimiter); // Apply rate limiter to auth routes
app.use('/api/product', ProductRoute);
app.use('/api/cart', CartRoute);
app.use('/api/orders', OrderRoute);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})