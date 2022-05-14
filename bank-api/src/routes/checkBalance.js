const express = require("express")
const router = express.Router();

const Account = require('../models/accountModel');

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


module.exports = router