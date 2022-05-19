const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel')



//need to modify
router.post('/place',async(req,res)=>{
    try{  

        const order = new Order({
            ...req.body,

        })
        await order.generateOrderID();
        res.send(order);
    }catch(e){
        res.send({e})
    }
})


router.get('/status',async(req,res)=>{

})

router.patch('/changestatus',async(req,res)=>{

})








module.exports = router;