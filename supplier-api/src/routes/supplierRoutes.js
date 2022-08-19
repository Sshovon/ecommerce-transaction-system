const express = require("express");
const router = express.Router();

const SupplierTransaction = require("../models/supplierTransactionModel");

router.post("/add", async (req, res) => {
  try {

    const {orderID,customerID,sellerID,trxID,amount} = req.body
    const supplierTransaction = new SupplierTransaction({orderID,customerID,sellerID,trxID,amount});
    await supplierTransaction.save();
    res.send(supplierTransaction);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});


router.get('/validateOrder',async(req,res)=>{
    try {
        await SupplierTransaction.validate(trxID)
        res.send({message:"success"});
      } catch (e) {
        const error = e.message;
        res.send({ error });
      }
})

// router.get('/status',async(req,res)=>{
//     try{

//         const orderID = req.query.orderID;
//         const order= SupplierTransaction.findOne({orderID});
//         res.send({
//             statusProcessing:order.statusProcessing,
//             statusDelivered:order.statusDelivered
//         });

//     }catch(e){
//         res.send({e});
//     }
// })

// router.patch('/changestatus',async(req,res)=>{
//     try{

//         const orderID = req.query.orderID;
//         const transaction= SupplierTransaction.findOne({orderID});
//         await transaction.changeStatus();
//         res.send({
//             statusProcessing:order.statusProcessing,
//             statusDelivered:order.statusDelivered
//         });

//     }catch(e){
//         res.send({e});
//     }
// })

module.exports = router;
