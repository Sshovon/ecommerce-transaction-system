const express = require("express")
const router = express.Router();

const Account = require('../models/accountModel');

router.post('/',async (req,res)=>{
    try{
        const {inID,outID,amount}= req.body;
    
        const inAccount = await Account.findOne({accountNumber:inID});
        const outAccount = await Account.findOne({accountNumber:outID});
        
        inAccount.balance = inAccount.balance + parseInt(amount);
        outAccount.balance = outAccount.balance - parseInt(amount);

        // console.log(inAccount)
        // console.log(outAccount)

        await Promise.all([inAccount.save(),outAccount.save()]);
        res.send({
            status:"success"
        })
        
        
    }catch(e){
        res.status(404).send({e})
    }
})


module.exports = router