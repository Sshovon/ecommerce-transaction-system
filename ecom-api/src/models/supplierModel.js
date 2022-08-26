const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const createHash = require('hash-generator');
const hashLength = 12;



const supplierSchema = new mongoose.Schema({
    email:{
        type:String,
        uniqueL:true
    },
    sellerID:{
        type:String,
        unique:true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        minlength: 6,
        trim: true,
        required: true,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    accountNumber:{
        type:Number,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

})


//instance methods
supplierSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject(); // converting mongoose document to plain js object

    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

supplierSchema.methods.generateID = async function(){
    const supplier = this;
    supplier.supplierID = createHash(hashLength);
    await supplier.save();
}

supplierSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT, { expiresIn: '12h' });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}




//statics methods

supplierSchema.statics.verifyCredentials = async function (email, password) {
    const user = await Supplier.findOne({email})
    if (!user)
        throw new Error("Invalid credentials")
    const isMatch = await bcryptjs.compare(password, user.password)
    if (!isMatch)
        throw new Error("Invalid credentials")
    return user;
}

//middleware
supplierSchema.pre('save', async function (next) {
    const user = this;  //this is a mongoose object
    if (user.isModified("password")) {
        user.password = await bcryptjs.hash(user.password, 8);
    }
    next();
})


const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;

