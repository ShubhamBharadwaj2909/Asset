const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/LoginSignUpDb")
.then(()=>{
    console.log("Connection successful")
})
.catch((err)=>{
    console.log("Connection Failed",err)
})

const LoginSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    password :{
        type:String,
        required:true
    },
})

const collection = new mongoose.model("Collection1",LoginSchema)

module.exports = collection
