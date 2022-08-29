const express = require('express');
const cors = require('cors')
require('dotenv').config()
require('./src/db/mongoose')
const path = require('path')
const app= express();
app.use(cors())

require('./generateSupplierData')
//static routes for access images directly
app.use(express.static(path.join(__dirname, '/src/images')))
const port = process.env.PORT || 5000;

const addProduct = require("./src/routes/productRoutes");
const updateProduct = require("./src/routes/updateProduct")
const supplierRoutes = require("./src/routes/supplierRoutes");
const devRoutes = require('./src/routes/devRoutes')
app.use(express.json()); 


app.use('/product',addProduct);
app.use('/update',updateProduct);
app.use('/supplier',supplierRoutes);
app.use('/dev',devRoutes);

app.listen(port,()=>{
    console.log(`supplier-api server started on port ${port}`);
})