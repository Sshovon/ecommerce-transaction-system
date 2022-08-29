const mongoose = require("mongoose");
const validator = require('validator');
//const uniqueValidator = require('mongoose-unique-validator')
const createHash = require('hash-generator');
const hashLength = 6;


const transactionSchema =  new mongoose.Schema({
    trxID:{
        type: String,
        uppercase:true   
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

// can't  use arrow function here because arrow does bind this 
transactionSchema.methods.generateTrx = async function(){
    const transaction = this;
    //console.log(transaction)
    transaction.trxID = createHash(hashLength);
    await transaction.save();
}



const transactionList = mongoose.model('Transaction',transactionSchema); 
module.exports = transactionList;