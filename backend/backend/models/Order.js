const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderNumber: { type: String, unique: true },
    userId: { type: String, ref: 'User' },
    customer: { type: String }, // Just a name/identifier
    products: { type: Array },
    deliveryInfos: { type: Object }, // All delivery/payment details here
    paymentMethod: { type: String, default: 'Cash On Delivery' },
    status: { type: String, default: 'pending' },
    date: { type: String }
}, { timestamps: true });


// Generate order number before saving
orderSchema.pre('save', async function (next) {
    if (!this.orderNumber) {
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const count = await this.constructor.countDocuments();
        this.orderNumber = `ORD-${date}-${(count + 1).toString().padStart(4, '0')}`;
    }
    next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;