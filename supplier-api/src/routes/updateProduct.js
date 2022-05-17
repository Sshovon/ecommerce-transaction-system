const express = require("express");
const router = express.Router();


const Product = require("../models/productModel")

router.patch('/quantity',async(req,res)=>{
    //const {name,price,quantity,description,category,sellerID} = req.body;
    try{
        const {sellerID,productID,quantity} = req.body;
        //console.log(req.body)
        const product=await Product.findOne({sellerID,productID});  
        await product.updateQuantity(parseInt(quantity));
        res.send(product);

    }catch(e){
        res.send({e})
    }
})

router.patch('/price',async(req,res)=>{
    //const {name,price,quantity,description,category,sellerID} = req.body;
    try{
        const {sellerID,productID,price} = req.body;
        //console.log(req.body)
        const product=await Product.findOne({sellerID,productID});  
        await product.updatePrice(parseInt(price));
        res.send(product);

    }catch(e){
        res.send({e})
    }
})


router.patch('/discount',async(req,res)=>{
    //const {name,price,quantity,description,category,sellerID} = req.body;
    try{
        const {sellerID,productID,discount} = req.body;
        //console.log(req.body)
        const product=await Product.findOne({sellerID,productID});  
        await product.updateDiscount(parseInt(discount));
        res.send(product);

    }catch(e){
        res.send({e})
    }
})



module.exports = router;