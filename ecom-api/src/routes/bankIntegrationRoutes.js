const express = require('express')
const router = express.Router()
const Customer = require('../models/customerModel');
const auth=require("../middlewares/auth")

router.get('/secretstatus',auth ,async (req,res)=>{
    try{

        const [user] = await Customer.find({_id:req.user._id});
        res.send({status: user.bankInformation.setSecret});
    }catch(e){
        const error=e.message;
        res.status(400).send({error})
    }

})


router.post('/validatesecret',auth ,async (req,res)=>{
    try{
        const {secret} = req.body;
        const [user] = await Customer.find({_id:req.user._id});
        const isMatch=await user.validateSecret(secret);
        res.send({status:isMatch});


    }catch(e){
        const error=e.message;
        res.status(400).send({error})
    }

})


router.post('/integrate',auth,async(req,res)=>{
    try{
        const {secret, accountNumber} = req.body;
        const user= req.user;
        user.bankInformation.secret=secret;
        user.bankInformation.accountNumber=accountNumber;
        user.bankInformation.setSecret=true;
        await user.save();
        res.send({
            user
        })
    }catch(e){
        const error=e.message;
        res.status(400).send({error})
    }
})


module.exports=router;
