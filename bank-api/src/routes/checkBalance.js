const express = require("express")
const router = express.Router();

const Account = require('../models/accountModel');
const Transaction = require('../models/transactionModel');


router.post('/',async (req,res)=>{
    try{
        const {accountNumber}= req.body
        const accountInfo = await Account.findOne({accountNumber});
        //console.log(accountInfo)
        res.send(accountInfo.balance.toString());
        
    }catch(e){
        res.status(404).send({e})
    }
})

router.get('/transaction',async(req,res)=>{
    try{
        const accountNumber = req.query.accountNumber
        
        const inTransaction =  Transaction.find({inID:accountNumber});
        const outTransaction =  Transaction.find({outID:accountNumber});
        const result=await Promise.all([inTransaction,outTransaction])

        res.send(result)
        
    }catch(e){
        const error=e.message
        res.status(404).send({error})
    }
})



module.exports = router