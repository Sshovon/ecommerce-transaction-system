const express = require('express')
const router = express.Router()
const Customer = require('../models/customerModel');
const Cart = require('../models/cartItemModel')
const auth=require("../middlewares/auth")


router.post('/signup',async (req,res)=>{
    try{
        const {email,password,mobile,address,name} = req.body;

        const existMail = await Customer.find({"contactInformation.email":email})
        if(existMail.length){
            throw new Error("Email already exist");
        }
        
        const customer = new Customer({
            contactInformation:{
                email,
                mobile,
                address
            },
            name,
            password
        });
        await customer.generateID();
        const cartItem = new Cart({
            email,
            customerID:customer.customerID
        })
        await cartItem.save();
        res.send({
            customer,
            cartItem
        });
    }catch(e){
        const error= e.message;
        res.status(400).send({error})
    }
});

router.post('/signin',async (req,res)=>{
    try{
        const {email, password} = req.body;
        const user = await Customer.verifyCredentials(email,password);
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
        //const [user]=await Customer.find({_id:req.user._id});
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