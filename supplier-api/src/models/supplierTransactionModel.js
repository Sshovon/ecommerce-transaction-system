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
    trxID:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true
    },
    validateOrder:{
        type:Boolean,
        default:false
    },
    productID:{
        type:String
    },
    name:{
        type:String
    },
    
})


// supplierTransactionSchema.methods.changeStatus = async function(){
//     const transaction = this;
//     transaction.statusProcessing=false;
//     transaction.statusDelivered=true;
//     await transaction.save();
// }


supplierTransactionSchema.statics.validate = async function(trxID){
    const [st]= await supplierTransactionList.find({trxID});
    console.log(st)
    st.validateOrder=true;
    await st.save();
}


const supplierTransactionList = mongoose.model('SupplierTransaction',supplierTransactionSchema);
module.exports = supplierTransactionList;