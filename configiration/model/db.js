const mongoose = require("mongoose")
// require('dotenv').config();

mongoose.connect('mongodb+srv://amarehagos26273424:26273424@mernproject.ww2aaqx.mongodb.net/resultdb?retryWrites=true&w=majority').then(console.log("db connceted")).catch((err)=>{
    console.log(err)
})

const newschema = new mongoose.Schema({
  pName:{
    type:String,
    required:[true,'must provide pname'],
    
   }
   ,
   pNumber:{
    type:Number,
    required:[true,'must provide pnumber'],
    
   },
   description:{
    type:String
   },
   Pgiver:{
    type:String,
    required:[true,'must provide pnumber'],
   },
    addedDate: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  },
})




const userschema = new mongoose.Schema({
  name:{
    type:String,
    trim:true,
    required:[true,'must provide pname'],
    
   }
   ,
   email:{
    type:String,
    trim:true,
    required:[true,'must provide email'],
    
   },
   password:{
    type:String,
    required:[true,'must provide pnumber'],
   },
   role: [{
    type: String,
    trim: true,
    required: [true, 'must provide role'],
  }]
  
 
})





const requestschema = new mongoose.Schema({
  name:{
    type:String,
    trim:true,
    required:[true,'must provide name'],
    
   }
   ,  
   email:{
    type:String,
    trim:true,
    required:[true,'must provide email'],
    
   },
   pname:{
    type:String,
    trim:true,
    required:[true,'must provide pnume'],
    
   },
   pnumber:{
    type:Number,
    required:[true,'must provide pnumber'],
   },
   description:{
    type:String,
    trim:true,
    required:[true,'must provide descrption'],
   },
   status:{
    type:String,
    trim:true,
    default:'requested',
   },
   typeofproduct:{
    type:String, 
    default:'consumable'
   },
   loanDate:{
    type:Date,
    default: () => new Date().toISOString().split('T')[0]
   },
   returnedDate:{
      type:Date
   }


 
})




const collection = mongoose.model("store management",newschema)
const usercollection = mongoose.model("user-collection",userschema)
const requestcollection = mongoose.model("request-collection",requestschema)



module.exports= {
          
         collection,
         usercollection,
         requestcollection

}