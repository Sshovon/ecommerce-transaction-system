const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    cart:[
        {
            productID:{
                type:String,
                required:true,
                unique:true
            },
            quantity:{
                type:Number,
                required:true,
            },
            price:{
                type:Number,
                required:true,
            }

        }    
    ]
    
})

checkDuplicateItemInCart = async(cartItems,productID)=>{
    const item=cartItems.find((item)=> item.productID == productID);
    return item;
}

cartSchema.methods.addItem = async function(productID,price,quantity){
    const item = this;
    const duplicateItem = await checkDuplicateItemInCart(item.cart,productID);
    if(duplicateItem){
        const index = item.cart.findIndex((element)=> element.productID == productID);
        item.cart[index].quantity=parseInt(item.cart[index].quantity)+parseInt(quantity);
    }else{
        item.cart= item.cart.concat({productID,price,quantity});
    }
    await item.save();
}

cartSchema.methods.removeItem = async function(productID){
    const item = this;
    item.cart = item.cart.filter((element)=> element.productID != productID);
    await item.save();
}

cartSchema.methods.clearCart = async function(){
    const item = this;
    item.cart = item.cart.filter((element)=> true);
    await item.save();
}


const Cart = mongoose.model('Cart',cartSchema);
module.exports = Cart;