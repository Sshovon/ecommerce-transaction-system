const Customer = require('./src/models/customerModel');
const Supplier = require('./src/models/supplierModel');



accountGenerate = async()=>{
    const supplier= new Supplier({
        email:"m.a.nahid@gmail.com",
        sellerID:"33333",
        name:"Masum Alam Nahid",
        password:"123456",
        accountNumber:"33333",
    })
    const admin= new Supplier({
        email:"admin@gmail.com",
        name:"Admin",
        password:"123456",
        accountNumber:"11111",
        isAdmin:true
    })

    Promise.all([supplier.save(),admin.save()])
}


accountGenerate();
console.log("supplier-accounts generated")