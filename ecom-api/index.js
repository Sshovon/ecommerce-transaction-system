const express = require('express');
require('dotenv').config()
require('./src/db/mongoose')
const app= express();
const port = process.env.PORT || 6000;

app.use(express.json()); 





app.listen(port,()=>{
    console.log(`ecom-api server started on port ${port}`);
})