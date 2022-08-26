const express = require("express")
const router = express.Router();

const Account = require('../models/accountModel');

router.post('/',async (req,res)=>{
    console.log(req.body)
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


module.exports = router