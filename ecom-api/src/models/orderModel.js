const mongoose = require("mongoose");
const createHash = require('hash-generator');
const hashLength = 12;


const orderSchema = new mongoose.Schema({
    orderID:{
        type:String,
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


orderSchema.methods.generateOrderID= async function(){
    const order = this;
    //console.log(transaction)
    order.orderID = createHash(hashLength);
    await order.save();
}


const orderList = mongoose.model('order',orderSchema);
module.exports = orderList;