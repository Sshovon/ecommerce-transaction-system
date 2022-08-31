const mongoose = require("mongoose");
const createHash = require('hash-generator');
const hashLength = 6;


const orderSchema = new mongoose.Schema({
    orderID:{
        type:String,
        uppercase:true
    },
    customerID:{
        type:String,
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
            quantity:{
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
        required:true,
        unique:true,
        uppercase:true
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
    const result=await Order.find({orderID})
    return result[0]
}

orderSchema.statics.changeStatus = async function(orderID){
    const result=await Order.findOne({orderID})
    console.log(result)
    result.statusProcessing=false;
    result.statusDelivered=true;
    await result.save()
}


const Order = mongoose.model('Order',orderSchema);
module.exports = Order;