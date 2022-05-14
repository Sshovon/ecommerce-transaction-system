const express = require("express")
const router = express.Router();
const Transaction = require('../models/transactionModel')


router.post('/',async (req,res)=>{
    try{
        const { inID, outID, amount } = req.body;
        const transaction= new Transaction({inID,outID,amount});
        await transaction.save();
        res.send({
            "status":"success"
        })
        
    }catch(e){
        res.status(404).send({e})
    }
})


module.exports = router