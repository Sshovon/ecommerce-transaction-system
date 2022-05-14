const mongoose = require("mongoose");
const validator = require('validator');
//const uniqueValidator = require('mongoose-unique-validator')
const createHash = require('hash-generator');
const hashLength = 12;


const transactionSchema =  new mongoose.Schema({
    trxID:{
        type: String,
        default: createHash(hashLength)
    },
    inID:{
        type:String,
        ref: "Account",
        require: true
    },
    outID:{
        type:String,
        ref:"Account",
        require: true
    },
    amount:{
        type: Number,
        require: true
    },
    date: {
        type: String,
        default: new Date().toString()
    }
    
})




const transactionList = mongoose.model('Transaction',transactionSchema); 
module.exports = transactionList;