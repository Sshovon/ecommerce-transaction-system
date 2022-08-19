const mongoose = require("mongoose");


const supplierTransactionSchema = new mongoose.Schema({
    orderID:{
        type:String,
        required:true,
    },
    customerID:{
        type:String,
        required:true
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


supplierTransactionSchema.methods.changeStatus = async function(){
    const transaction = this;
    transaction.statusProcessing=false;
    transaction.statusDelivered=true;
    await transaction.save();
}


const supplierTransactionList = mongoose.model('SupplierTransaction',supplierTransactionSchema);
module.exports = supplierTransactionList;