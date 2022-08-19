const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

//view product by seller , by category

router.post("/add", async (req, res) => {
  //const {name,price,quantity,description,category,sellerID} = req.body;
  try {
    const {
      name,
      price,
      quantity,
      description,
      category,
      rating,
      sellerID,
      discount,
    } = req.body;
    const product = new Product({
      name,
      price,
      quantity,
      description,
      category,
      rating,
      sellerID,
      discount,
    });
    await product.generateID();
    res.send(product);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});

// /view --> all products
// /view?ID=something --> specific one product
// /view?sellerID=something --> specific seller's all products

router.get("/view", async (req, res) => {
  try {
    const ID = req.query.ID;
    const sellerID = req.query.sellerID;
    if (ID) {
      const product = await Product.viewOne(productID);
      res.send(product);
    } else if (sellerID) {
      const products = await Product.viewSpecificSellerID(sellerID);
      res.send(products);
    } else {
      const products = await Product.viewAll();
      res.send(products);
    }
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});

module.exports = router;
