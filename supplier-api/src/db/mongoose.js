const mongoose = require('mongoose')
//console.log(process.env.DB_URL)

mongoose.connect(process.env.DB_URL,{ 
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("supplier-api database connected successfully")
}).catch(()=>{
    console.log("supplier-api database connection failed")
})



