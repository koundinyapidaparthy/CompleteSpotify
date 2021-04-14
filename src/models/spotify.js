const mongoose = require('mongoose');
const bcrypt= require("bcryptjs")
const spotifySchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    emailverify:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    year:{
        type:Number,
        maxLength:4,
    },
    month:{
        type:String,
    },
    day:{
        type:Number,
        maxLenght:2,
    },
})
spotifySchema.pre("save",async function (next){
    if(this.isModified("password")){
        console.log(`entered password is ${this.password}`)
        this.password=await bcrypt.hash(this.password,10);
        console.log(`entered password is ${this.password}`)
    }
    next();
})
const Spotify=new mongoose.model("Spotify",spotifySchema);
module.exports=Spotify;