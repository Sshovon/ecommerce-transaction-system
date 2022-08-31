//clear cart
//remove item from cart

const express = require('express');
const router = express.Router();
const Cart = require('../models/cartItemModel');
const auth = require('../middlewares/auth')

router.get('/view',auth ,async(req,res)=>{
    try {
        console.log(req.user.contactInformation.email)
        const cart = await Cart.findOne( {email:req.user.contactInformation.email})
        res.send(cart)
    } catch (e) {
        const error=e.message
        res.send({ error })
    }
})


//add --> + ; remove --> -  
router.post('/add', auth, async (req, res) => {
    console.log(req)
    try {
        const productID = req.body.productID;
        const quantity = req.body.quantity;
        const price = req.body.price;
        const sellerID = req.body.sellerID
        const cartItem = await Cart.findOne({ email: req.user.contactInformation.email });
        await cartItem.addItem(productID, price, quantity,sellerID);
        res.send(cartItem);
    } catch (e) {
        const error = e.message;
        res.send({ error })
    }
})


router.delete('/remove', auth ,async (req, res) => {
    try {
        const productID = req.query.productid;
        const cart = await Cart.findOne( {email:req.user.contactInformation.email})
        await cart.removeItem(productID);

        res.send({
            status:"success",

        })

    } catch (e) {
        const error=e.message
        res.send({ error })
    }
})

router.get('/clear',auth ,async (req, res) => {
    try {
        const cart = await Cart.findOne( {email:req.user.contactInformation.email})
        await cart.clearCart();
        res.send({status:"success"});

    } catch (e) {

        const error=e.message
        res.send({ error })
    }
})








module.exports = router;