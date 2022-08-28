const express = require('express');
require('dotenv').config()
require('./src/db/mongoose')
//require('./generateBankData') // generating bank-account 
const app= express();

let cors = require('cors') 
app.use(cors())

const port = process.env.PORT || 4000;

require('./src/utils/populateBankAccount');
const addTransaction = require('./src/routes/addTransaction');
const checkBalance = require('./src/routes/checkBalance');
const validity =require('./src/routes/validTransaction');
//const adjustBalance=require('./src/routes/adjustBalance')
const devRoutes = require('./src/routes/developmentRoutes')
// var createHash = require('hash-generator');
// var hashLength = 8;
// var hash = createHash(hashLength);

//console.log(hash)
app.use(express.json()); 
app.use('/add',addTransaction);
app.use('/balance',checkBalance);
app.use('/valid',validity);
//app.use('/adjust',adjustBalance);
app.use('/dev',devRoutes)




app.listen(port,()=>{
    console.log(`bank-api server started on port ${port}`);
})