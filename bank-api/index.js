const express = require('express');
require('dotenv').config()
require('./src/db/mongoose')
//require('./generateBankData') // generating bank-account 
const app= express();

const port = process.env.PORT || 4000;


const addTransaction = require('./src/routes/addTransaction');
const checkBalance = require('./src/routes/checkBalance');
const validity =require('./src/routes/validTransaction');
const adjustBalance=require('./src/routes/adjustBalance')
// var createHash = require('hash-generator');
// var hashLength = 8;
// var hash = createHash(hashLength);

//console.log(hash)
app.use(express.json()); 
app.use('/add',addTransaction);
app.use('/balance',checkBalance);
app.use('/valid',validity);
app.use('/adjust',adjustBalance);




app.listen(port,()=>{
    console.log(`bank-api server started on port ${port}`);
})