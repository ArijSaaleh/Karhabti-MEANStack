const mongoose = require('mongoose');
const _ = require("lodash");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone:{
        type: Number,
    },
    password: {
        type: String,
        required: true
    }
})
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
  
    // return the document except the password (it shouldn't be made available)
    return _.omit(userObject, ["password"]);
  };

module.exports = mongoose.model('User', userSchema)