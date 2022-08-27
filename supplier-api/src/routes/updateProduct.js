const express = require("express");
const router = express.Router();

const Product = require("../models/productModel");



router.patch("/",async (req,res)=>{
  try {
    const { sellerID, productID,name,price,quantity,description,category,discount } = req.body;
    // console.log("hey req" ,req.body)
    const product = await Product.findOne({ sellerID, productID });
    await product.updateProduct(name,price,quantity,description,category,discount);
    // console.log(product)
    res.send(product);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
})

router.patch("/quantity", async (req, res) => {
  //const {name,price,quantity,description,category,sellerID} = req.body;
  try {
    const { sellerID, productID, quantity } = req.body;
    //console.log(req.body)
    const product = await Product.findOne({ sellerID, productID });
    await product.updateQuantity(parseInt(quantity));
    res.send(product);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});

router.patch("/price", async (req, res) => {
  //const {name,price,quantity,description,category,sellerID} = req.body;
  try {
    const { sellerID, productID, price } = req.body;
    //console.log(req.body)
    const product = await Product.findOne({ sellerID, productID });
    await product.updatePrice(parseInt(price));
    res.send(product);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});

router.patch("/discount", async (req, res) => {
  //const {name,price,quantity,description,category,sellerID} = req.body;
  try {
    const { sellerID, productID, discount } = req.body;
    //console.log(req.body)
    const product = await Product.findOne({ sellerID, productID });
    await product.updateDiscount(parseInt(discount));
    res.send(product);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});

module.exports = router;
