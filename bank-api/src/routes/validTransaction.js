const express = require("express")
const router = express.Router();

const Account = require('../models/accountModel');
const Transaction = require('../models/transactionModel');


router.post('/',async (req,res)=>{
    //console.log(req.body)
    try{
        const {amount ,accountNumber }= req.body;
        console.log(accountNumber)
        const accountInfo = await Account.findOne({accountNumber});
        console.log(accountInfo)
        if(parseInt(amount)<=parseInt(accountInfo.balance)){
            res.send({
                status:"valid"
            })
        }else{
            res.send({
                status:"invalid"
            })
        }
        
    }catch(e){
        const error=e.message
        res.status(404).send({error})
    }
})


router.post('/validate',async(req,res)=>{
    try{
        const {trxID,accountNumber:inID} = req.body
        //console.log(trxID,inID)
        let result = await Transaction.findOne({trxID,inID})
        if(!result)
            result={}
            result.error="No Transaction Found"
        res.send(result)
        
    }catch(e){
        const error=e.message
        res.status(404).send({error})
    }
})





module.exports = router