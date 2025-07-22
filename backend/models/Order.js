const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./User');
const Product = require('./Product');

const orderSchema = new Schema({
    orderNumber: { type: String, unique: true },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        require: false // no required for guest orders
    },
    guestCustomer: {
        name: String,
        email: String,
        phone: String
    },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        size: String,
        quantity: Number,
        price: Number
    }],
    deliveryAddress: {
        street: String,
        city: String,
        wilaya: String,
        postalCode: String
    },
    deliveryFee: Number,
    subtotal: Number,
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