const express = require("express")
const router = express.Router();

const Account = require('../models/accountModel');

router.post('/',async (req,res)=>{
    try{
        const {amount ,accountNumber }= req.body;
        const accountInfo = await Account.findOne({accountNumber});
        
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
        res.status(404).send({e})
    }
})


module.exports = router