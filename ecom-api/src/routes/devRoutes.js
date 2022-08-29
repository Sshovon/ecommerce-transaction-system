const express = require('express')
const router = express.Router()
const Customer = require('../models/customerModel');
const Supplier = require('../models/supplierModel');
const auth=require("../middlewares/auth")


router.get('/view/customer',async(req,res)=>{
    const result = await Customer.find({})
    res.send(result);
})

router.get('/drop/customer',async(req,res)=>{
    const result=await Customer.collection.drop()
    res.send(result);
})

router.get('/view/supplier',async(req,res)=>{
    const result = await Supplier.find({})
    res.send(result);
})

router.get('/drop/supplier',async(req,res)=>{
    const result=await Supplier.collection.drop()
    res.send(result);
})





module.exports=router;
