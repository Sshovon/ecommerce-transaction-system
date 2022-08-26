const jwt=require("jsonwebtoken");
const User = require("../models/customerModel");



const auth = async(req,res,next)=>{
    try{
        // const token=req.rawHeaders[9].split('=')[1];
        const token = req.headers.cookie.split('=')[1]
        const decoded=jwt.verify(token,process.env.JWT);
        const user = await User.find({_id : decoded._id,"tokens.token":token})
        //console.log(user)
        if(!user) throw new Error("Please authenticate");
        req.user=user[0];
        next()

    }catch(e){
        const error=e.message;
        res.status(400).send({error})
    }
}

module.exports = auth;