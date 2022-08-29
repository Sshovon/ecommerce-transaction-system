const express = require('express')
const router = express.Router()
const Product = require('../models/productModel');


router.get('/view/product',async(req,res)=>{
    const result = await Product.find({})
    res.send(result);
})

router.get('/drop/product',async(req,res)=>{
    const result=await Product.collection.drop()
    res.send(result);
})






module.exports=router;
