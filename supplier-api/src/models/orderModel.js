const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderID:{
        type:String,
        required:true,
    },
    customerName:{
        type:String,
    },
    address:{
        type:String
    },
    contactInfo:{
        type:String
    },
    sellerID:{
        type:String,
        required:true,
    },
    productID:{
        type:String,
        ref: "Product", 
        required:true,
    },
    quantiy:{
        type:Number,
        required:true,
    },
    trxID:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    statusProcessing:{
        type:Boolean,
        default:true,
    },
    statusDelivered:{
        type:Boolean,
        default:true,
    }
})


const orderList = mongoose.model('order',orderSchema);
module.exports = orderList;