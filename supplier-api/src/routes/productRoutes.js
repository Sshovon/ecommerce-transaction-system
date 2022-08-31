const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Product = require("../models/productModel");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
// router.post('/upload',  upload.single('image'),async (req,res)=>{
//   console.log(req.file)
//   res.send("ok")
// })

router.post("/add",upload.single('image') ,async (req, res) => {
  //const {name,price,quantity,description,category,sellerID} = req.body;
  console.log(req)
  console.log(req.body)
  console.log(req.file)
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
      image: {
        filename: req.file.filename,
        path: `http://localhost:${process.env.PORT}/` + req.file.filename,
      },
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
    console.log(req.query);
    const sellerID = req.query.sellerID;
    if (ID) {
      const product = await Product.viewOne(ID);
      console.log(product);
      res.send(product);
    } else if (sellerID) {
      const products = await Product.find({sellerID});
      res.send(products);
    } else {
      const products = await Product.viewAll();
      res.send(products);
    }
  } catch (e) {
    const error = e.message;
    console.log(error);
    res.send({ error });
  }
});

router.get("/view-image", async (req, res) => {
  var options = {
    root: path.join(__dirname),
  };
  console.log(options);
  res.sendFile("./images/1661711682306.png");
});

module.exports = router;
