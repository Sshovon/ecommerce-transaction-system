const express = require("express");
const router = express.Router();


const Product = require("../models/productModel")

router.post('/',async(req,res)=>{
    //const {name,price,quantity,description,category,sellerID} = req.body;
    try{
        const product = new Product({...req.body});
        await product.generateID();
        res.send(product);

    }catch(e){
        res.send({e})
    }
})


module.exports = router;