const express = require('express');
require('dotenv').config()
require('./src/db/mongoose')
const app= express();
const port = process.env.PORT || 5000;

const addProduct = require("./src/routes/addProduct");
const updateProduct = require("./src/routes/updateProduct")
const supplierRoutes = require("./src/routes/supplierRoutes");
app.use(express.json()); 


app.use('/add',addProduct);
app.use('/update',updateProduct);
app.use('/product',supplierRoutes);

app.listen(port,()=>{
    console.log(`supplier-api server started on port ${port}`);
})