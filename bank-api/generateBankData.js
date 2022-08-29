const Account = require('./src/models/accountModel')

saveData = async()=>{
    const ecom= new Account({
        holderName:"E-Commerce Bank Account",
        accountNumber: '11111',
        balance:0
    })
    const client= new Account({
        holderName:"Fairuz Rahaman Chowdhury",
        accountNumber: '22222'
    })
    const supplier= new Account({
        holderName:"Masum Alam Nahid",
        accountNumber: '33333',
        balance:0
    })

    Promise.all([ecom.save(),client.save(),supplier.save()])
}


saveData();
console.log("bank-accounts generated")