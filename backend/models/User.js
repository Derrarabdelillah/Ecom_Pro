const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

// define the Shema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object,
        default: {}
    },
    joinDate: {
        type: Date,
        default: Date.now()
    }
}, {minimize: false})


// Hashing the Password using bcrypt
UserSchema.pre('save', async function (next) {
    if ( this.isModified("password") ) {
        try {
            this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
        } catch (err) {
            return next(err)
        }
    }

    next();
})

// define the model of the schema
const User = mongoose.model('User', UserSchema);

// export the model
module.exports = User;
