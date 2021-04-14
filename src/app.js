const hbs= require('hbs');
require("./db/conn");
const Spotify= require('./models/spotify');
const path = require('path');
const express = require('express');
const { urlencoded } = require('express');
const app=express();
const port =process.env.PORT || 8080;
const static_path=path.join(__dirname,"../public");
const views_path=path.join(__dirname,"../templates/views")
const partials_path=path.join(__dirname,"../templates/partials");
const bcrypt=require("bcryptjs")
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path))
app.set("view engine","hbs");
app.set("views",views_path);
hbs.registerPartials(partials_path)
app.get("/", async(req,res)=>{
    // res.send("hello world from app.js");
    res.render("index");
    
})
app.get("/index", async(req,res)=>{
    // res.send("hello world from app.js");
    res.render("index");
    
})
app.get("/register", async(req,res)=>{
    // res.send("hello world from app.js");
    res.render("register");
    
})

app.get("/login",async(req,res)=>{
    res.render("login");
})
app.post("/details", async(req,res)=>{
    try{
        const email=req.body.email;
        const emailverify=req.body.verfiyemail;
        const password=req.body.password;
        const name=req.body.textname;
        const year=req.body.year;
        const month=req.body.month;
        const day=req.body.day;
        if(email==emailverify){
            const newCollection=new Spotify({
                email:email,
                emailverify:emailverify,
                password:password,
                name:name,
                year:year,
                month:month,
                day:day
            });
            const result =await newCollection.save();
            res.send(result);
            console.log(result)
        }
        else{
             res.send("email and verify email are not matching");
        }
    }
    catch(e){console.log(e)}
})
app.post("/login",async(req,res)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;
        const result = await Spotify.findOne({email:email})
        const isMatch=bcrypt.compare(password,result.password);
        if(isMatch){
            res.status(201).render("index");
        }
        else{
            res.send("invalid details")
        }
        console.log(result);
    }
    catch(e){res.send("email is wrong")}
})

app.listen(port,()=>{
    console.log(`connection running in localhost ${port}`);
});
