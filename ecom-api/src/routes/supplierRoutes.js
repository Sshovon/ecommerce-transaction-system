const express = require('express')
const router = express.Router()
const Supplier = require('../models/supplierModel');
const auth=require("../middlewares/auth")


router.post('/signup',async (req,res)=>{
    try{
        const {email,password,name,isAdmin=false,accountNumber} = req.body;

        const existMail = await Supplier.find({email})
        if(existMail.length){
            throw new Error("Email already exist");
        }
        let supplier;
        if(isAdmin){
             supplier = new Supplier({
                email,
                name,
                password,
                isAdmin,
                accountNumber
            });
        }else{
             supplier = new Supplier({
                email,
                name,
                password,
                isAdmin,
                accountNumber,
                sellerID:accountNumber
            });
        }
        
        await supplier.save()
        res.send(supplier)
    }catch(e){
        const error= e.message;
        res.status(400).send({error})
    }
});

router.post('/signin',async (req,res)=>{
    try{
        const {email, password} = req.body;
        //console.log(email)
        const user = await Supplier.verifyCredentials(email,password);
        //console.log(user)
        if(!user) throw new Error("Invalid credential");
        const token = await user.generateAuthToken();
        res.cookie('token',token);
        res.send({user,token});
    }catch(e){
        const error= e.message;
        res.status(400).send({error})
    } 
});

router.get('/signout',auth,async (req,res)=>{
    try{
        console.log(req.headers, req.user)
        const cookieToken=req.headers.token;
        //const [user]=await Supplier.find({_id:req.user._id});
        const user=req.user;
        user.tokens=user.tokens.filter((token)=> cookieToken != token.token)
        res.cookie("token","");
        await user.save();
        res.send(user);
    }catch(e){
        const error=e.message
        res.send({error})
    }
});

module.exports = router