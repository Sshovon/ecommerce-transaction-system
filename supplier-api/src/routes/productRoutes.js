const express = require("express");
const router = express.Router();
const Product = require("../models/productModel")


//view product by seller , by category 

router.post('/add',async(req,res)=>{
    //const {name,price,quantity,description,category,sellerID} = req.body;
    try{
        const product = new Product({...req.body});
        await product.generateID();
        res.send(product);

    }catch(e){
        res.send({e})
    }
})

router.get('/viewall',async(req,res)=>{
    try{
        const products = await Product.viewAll();
        res.send(products);
    }catch(e){
        res.send({e})
    }
})

router.get('/viewone',async(req,res)=>{
    try{
        const productID=req.query.productid;
        const product = await Product.viewOne(productID);
        console.log(product)
        res.send(product);
    }catch(e){
        res.send({e})
    }
})


module.exports = router;