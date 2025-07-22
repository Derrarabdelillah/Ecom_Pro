const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./User');
const Product = require('./Product');

const orderSchema = new Schema({
    orderNumber: { type: String, unique: true }, // Like "ORD-20240615-001"
    customer: { // null for guests
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        require: false // no required for guest orders
    },
    guestCustomer: { // For non-logged-in users
        name: String,
        email: String,
        phone: String // Required for Algerian delivery
    }, 
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        size: String,
        quantity: Number,
        price: Number
    }],
    delivery: {
        wilaya: String,
        address: String,
        postalCode: String,
        fee: Number // Calculated from wilaya
    },
    total: Number,
    paymentMethod: {
        type: String,
        default: 'Cash On Delivery'
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true } );

// Generate order number before saving
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const count = await this.constructor.countDocuments();
    this.orderNumber = `ORD-${date}-${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;