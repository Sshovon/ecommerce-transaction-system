const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
const auth = require("../middlewares/auth");

// router.get('/ok',auth,(req,res)=>{
//     console.log(req.user);
//     res.send("ok")
// })

// You have to call bank api to make transaction and pass the transaction id here for customer-end
router.post("/place", auth, async (req, res) => {
  //here orders is a array of order objects
  // each order has 4 properties
  // sellerID, productID, quantity, price

  try {
    const { trxID, orders } = req.body;
    const order = new Order({
      customerID: req.user.customerID,
      trxID,
      orders,
    });
    await order.generateOrderID();
    // console.log(order)
    res.send(order);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});

router.get("/information", async (req, res) => {
  try {
    const orderID = req.query.orderID;
    const order = await Order.orderInformation(orderID);
    res.send(order);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});

// router.patch('/changestatus',async(req,res)=>{

// })

module.exports = router;
