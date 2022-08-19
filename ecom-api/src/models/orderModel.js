const mongoose = require("mongoose");
const createHash = require('hash-generator');
const hashLength = 12;


const orderSchema = new mongoose.Schema({
    orderID:{
        type:String,
    },
    customerID:{
        type:String,
        unique:true,
        ref: 'Customer'
    },
    orders:[
        {
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
            price:{
                type:Number,
                required:true,
            },
        }
    ],
    trxID:{
        type:String,
        required:true
    },
    
    statusProcessing:{
        type:Boolean,
        default:true,
    },
    statusDelivered:{
        type:Boolean,
        default:false,
    }
})


orderSchema.methods.generateOrderID= async function(){
    const order = this;
    order.orderID = createHash(hashLength);
    await order.save();
}

orderSchema.statics.orderInformation = async function(orderID){
    const result=await orderList.find({orderID})
    return result[0]
}


const orderList = mongoose.model('order',orderSchema);
module.exports = orderList;