require('dotenv').config();
const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require('./Model/User')

const app = express();

mongoose.connect(process.env.DATABASE_URL)
.then(console.log("Connected to DB"))
.catch((err)=>{
    console.log(err)
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

// Create User

app.post("/vc/user/new",async(req,res)=>{       //create
    const user = await User.create(req.body)
    res.status(201).json({
        success:true,
        user
    })
}) 

// Read User

app.get("/vc/user/",async(req,res)=>{
    const users = await User.find()
    res.status(200).json({
        success:true,
        users
    })
})

//update user

app.put("/vc/user/:id",async(req,res)=>{

    let user = await User.findById(req.params.id)

    user = await User.findByIdAndUpdate(req.params.id,req.body,)
    
    res.status(200).json({
        success:true,
        user
    })
    
})


// Delete User

app.delete("/vc/user/:id",async(req,res)=>{

    let user = await User.findByIdAndRemove(req.params.id)

    if(!user){
        return res.status(500).json({
            success:false,
            message:"user not found"
        })
    }

    //await user.remove();
    
    res.status(200).json({
        success:true,
        message:"user deleted"
    })
    
})

app.listen(5000,()=>{
    console.log("Server is working at http://localhost:5000");
})