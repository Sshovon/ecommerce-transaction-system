const Account = require('../models/accountModel')


const accounts = async ()=>{
    try{
        const ecom= new Account({holderName:"E-Commerce",accountNumber:"11111"});
        const customer = new Account({holderName:"Nahid",accountNumber:"22222"});
        const supplier = new Account({holderName:"Supplier1",accountNumber:"33333"});
        await Promise.all([ecom.save(),customer.save(),supplier.save()])
        // await ecom.save()
        // await customer.save()
        // await supplier.save()

    }catch(e){
        console.log(e.message)
    }
}

// accounts().then(()=>{

// })

(async()=>{
    accounts()
    console.log("Accounts created");
})

