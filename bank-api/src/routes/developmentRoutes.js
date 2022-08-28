const express = require("express")
const router = express.Router();

const Account = require('../models/accountModel');
const Transaction = require('../models/transactionModel');


//dev purpose only
router.get('/drop-transaction',async(req,res)=>{
    try{
       const result = await Transaction.collection.drop()
       res.send(result)
        
    }catch(e){
        const error=e.message
        res.status(404).send({error})
    }
})

router.get('/view-transaction',async(req,res)=>{
    try{
        const result = await Transaction.find({});
        res.send(result)
        
    }catch(e){
        const error=e.message
        res.status(404).send({error})
    }
})

router.get('/drop-account',async(req,res)=>{
    try{
       const result = await Account.collection.drop()
       res.send(result)
        
    }catch(e){
        const error=e.message
        res.status(404).send({error})
    }
})

router.get('/view-account',async(req,res)=>{
    try{
        const result = await Account.find({});
        res.send(result)
        
    }catch(e){
        const error=e.message
        res.status(404).send({error})
    }
})


module.exports = router