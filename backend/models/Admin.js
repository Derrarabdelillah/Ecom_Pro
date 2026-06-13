const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

// define the Schema

const AdminSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Hash the password before saving
AdminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    }
    next();
});

// define model for the schema
const Admin = mongoose.model('Admin', AdminSchema);

// export the model
module.exports = Admin;