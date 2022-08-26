const Account = require('../models/accountModel')


const accounts = async ()=>{
    try{
        const ecom= new Account({holderName:"E-Commerce",accountNumber:"11111"});
        const customer = new Account({holderName:"Nahid",accountNumber:"22222"});
        const supplier1 = new Account({holderName:"Supplier1",accountNumber:"33333"});
        const supplier2 = new Account({holderName:"Supplier2",accountNumber:"44444"});
        const supplier3 = new Account({holderName:"Supplier3",accountNumber:"55555"});
        await Promise.all([ecom.save(),customer.save(),supplier1.save(),supplier2.save(),supplier3.save()])
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

