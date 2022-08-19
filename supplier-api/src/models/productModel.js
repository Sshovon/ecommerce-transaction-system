const mongoose = require('mongoose')
const createHash = require('hash-generator');
const hashLength = 6;

const productSchema = new mongoose.Schema({
    productID:{
        type:String,
        unique:true,
    },
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        default:0
    },
    quantity:{
        type:Number,
        default:0
    },
    description:{
        type:String,
    },
    category:{
        type:String
    },
    rating:{
        type:Number,
        default:0
    },
    sellerID:{
        type:String,
        trim: true,
        required: true,
    },
    discount:{
        type:Number,
        default:0
    }
    
})


productSchema.methods.generateID = async function(){
    const product = this;
    product.productID = createHash(hashLength);
    await product.save();
}

productSchema.methods.updateQuantity = async function(quantity){
    const product = this;
    product.quantity = product.quantity + quantity;
    await product.save()
}

productSchema.methods.updatePrice = async function(price){
    const product = this;
    product.price = price;
    await product.save()
}

productSchema.methods.updateDiscount = async function(discount){
    const product = this;
    product.price = discount;
    await product.save()
}

productSchema.statics.viewAll = async function(){
    const products = await Product.find({});
    return products;
}

productSchema.statics.viewOne = async function(productID){
    const product = await Product.find({productID});
    return product;
}
productSchema.statics.viewSpecificSellerProducts= async function(sellerID){
    const product = await Product.find({sellerID});
}


const Product = mongoose.model('Product',productSchema);
module.exports = Product;