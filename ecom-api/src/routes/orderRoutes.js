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

router.get("/information", auth, async (req, res) => {
  try {
    const orderID = req.query.orderID;
    const order = await Order.orderInformation(orderID);
    res.send(order);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});

router.get("/view", auth, async (req, res) => {
  try {
    console.log(req.user)
    const orders = await Order.find({ customerID: req.user.customerID });
    res.send(orders);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }

});


router.post('/changestatus',async(req,res)=>{
    try{

        const {orderID} = req.body;
        console.log('orderID', orderID)
        await Order.changeStatus(orderID)
        res.status(200).send({
            status:true
        });

    }catch(e){
        res.send({e});
    }
})



module.exports = router;
