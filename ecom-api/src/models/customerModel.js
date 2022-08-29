const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const createHash = require('hash-generator');
const hashLength = 6;



const customerSchema = new mongoose.Schema({
    contactInformation: {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,

            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Email is not valid");
                }
            }
        },
        mobile: {
            type: String,
            trim: true,
            required: true,
        },

        address: {
            type: String
        },

    },
    customerID:{
        type:String,
        unique:true,
        uppercase:true
    }
    ,
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
    deliveredOrder: [{
        order: {
            type: mongoose.Types.ObjectId,
            ref: "Order"
        }
    }
    ],
    processingOrder: [{
        order: {
            type: mongoose.Types.ObjectId,
            ref: "Order"
        }
    }
    ],
    bankInformation:{
        setSecret: {
            type: Boolean,
            default: false,
        },
        secret: {
            type:String,
        },
        accountNumber:{
            type:Number,
        }
    },
    verified:{
        type:Boolean,
        default:false
    },


})


//instance methods
customerSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject(); // converting mongoose document to plain js object

    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

customerSchema.methods.generateID = async function(){
    const customer = this;
    customer.customerID = createHash(hashLength);
    await customer.save();
}

customerSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT, { expiresIn: '12h' });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}


customerSchema.methods.validateSecret= async function(secret){
    const user= this;
    const isMatch = await bcryptjs.compare(secret,user.bankInformation.secret);
    return isMatch;
}

//statics methods

customerSchema.statics.verifyCredentials = async function (email, password) {
    const user = await Customer.findOne({ "contactInformation.email":email })
    if (!user)
        throw new Error("Invalid credentials")
    const isMatch = await bcryptjs.compare(password, user.password)
    if (!isMatch)
        throw new Error("Invalid credentials")
    return user;
}

//middleware
customerSchema.pre('save', async function (next) {
    const user = this;  //this is a mongoose object
    if (user.isModified("password")) {
        user.password = await bcryptjs.hash(user.password, 8);
    }
    if (user.isModified("bankInformation.secret")) {
        user.bankInformation.secret = await bcryptjs.hash(user.bankInformation.secret, 8);
    }
    next();
})


const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;

