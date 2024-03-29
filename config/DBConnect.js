const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '../.env')})


const connectDB= async ()=>{
    try{
       const client=await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser:true,
         useUnifiedTopology:true,
       })
       console.log(`MongoDB connected :${client.connection.host}`)
    }catch(err){
       console.log(`error:${err.message}`)
       process.exit()
    }
 }
 
 module.exports={
    connectDB
}