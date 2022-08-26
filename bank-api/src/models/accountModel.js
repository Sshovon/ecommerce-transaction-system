const mongoose = require("mongoose");
const validator = require('validator');
//const uniqueValidator = require('mongoose-unique-validator')

const accountSchema =  new mongoose.Schema({
    holderName:{
        type:String,
        required: true,
        trim: true
    },
    // email:{
    //     type:String,
    //     required: true,
    //     trim: true,
    //     unique: true,
    //     lowercase: true,

    //     validate(value) {
    //         if (!validator.isEmail(value)) {
    //             throw new Error("");
    //         }
    //     }
    // },
    // mobile: {
    //     type: String,
    //     minlength: 11,
    //     trim: true,
    //     required: true,
    // },
    accountNumber:{
        type: String,
        required: true,
        unique: true
    },
    balance:{
        type: Number,
        default: 100000
    }
})



const Account = mongoose.model('Account',accountSchema); 

module.exports = Account;