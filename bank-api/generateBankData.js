const Account = require('./src/models/accountModel')

saveData = async()=>{
    const ecom= new Account({
        holderName:"ecom",
        accountNumber: '1'
    })
    const client= new Account({
        holderName:"client",
        accountNumber: '2'
    })
    const supplier= new Account({
        holderName:"supplier",
        accountNumber: '3'
    })

    Promise.all([ecom.save(),client.save(),supplier.save()])
}


saveData();
console.log("bank-accounts generated")