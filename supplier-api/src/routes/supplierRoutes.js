const express = require("express");
const router = express.Router();

const SupplierTransaction = require("../models/supplierTransactionModel");
const Product = require('../models/productModel')

router.post("/add", async (req, res) => {
  try {
    const { orderID, customerID, sellerID, trxID, amount, quantity,productID } = req.body;
    const supplierTransaction = new SupplierTransaction({
      orderID,
      customerID,
      sellerID,
      trxID,
      amount,
      quantity,
      productID
    });
    await supplierTransaction.save();
    res.send(supplierTransaction);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});

router.post("/validateOrder", async (req, res) => {
  try {
    const {trxID,quantity,productID}=req.body;
    const product =await Product.find({productID})
    await product.updateQuantity(quantity)
    await SupplierTransaction.validate(trxID);
    res.send({ message: "success" });
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});

router.post("/view", async (req, res) => {
  try {
    const {sellerID} = req.body
    const orders=await SupplierTransaction.find({sellerID});
    res.send(orders);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});


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
