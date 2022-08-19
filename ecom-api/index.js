const express = require('express');
require('dotenv').config()
require('./src/db/mongoose')
const app= express();

let cors = require('cors') 
app.use(cors())


const port = process.env.PORT || 6000;
const userRoutes =require('./src/routes/customerRoutes') 
const bankRoutes=require('./src/routes/bankIntegrationRoutes'); 
const cartRoutes = require('./src/routes/cartRoutes');
const otpRoutes= require('./src/routes/otpRoutes');
const orderRoutes = require('./src/routes/orderRoutes')
app.use(express.json()); 


app.use('/user',userRoutes);
app.use('/bank',bankRoutes);
app.use('/cart',cartRoutes);
app.use('/otp',otpRoutes); 
app.use('/order',orderRoutes);

app.listen(port,()=>{
    console.log(`ecom-api server started on port ${port}`);
})