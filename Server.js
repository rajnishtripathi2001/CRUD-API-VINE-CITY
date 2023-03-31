//--- Importing all required modules ----

// const DATABASE_URL = require('./Config/DB.config');
const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require('./Model/User')
var cors = require('cors');


require('dotenv').config()

const PORT = process.env.PORT || 5000



// Declaring Express App
const app = express();


// Connecting Database

mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connected to DB"))
.catch((err)=>{
    console.log(err)
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
//--------- User Management API -----------------

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/"+"index.html")
})

// Create User

app.post(process.env.USER_CREATE_URL ,async(req,res)=>{
    const user = await User.create(req.body)
    res.status(201).json({
        success:true,
        user
    })
}) 

// Read User

app.get(process.env.USER_READ_URL ,async(req,res)=>{
    const users = await User.find()
    res.status(200).json({
        success:true,
        users
    })
})

//update user

app.put(process.env.USER_UPDATE_AND_DELETE_URL ,async(req,res)=>{

    let user = await User.findById(req.params.id)

    user = await User.findByIdAndUpdate(req.params.id,req.body,)
    
    res.status(200).json({
        success:true,
        user
    })
    
})

// Delete User

app.delete(process.env.USER_UPDATE_AND_DELETE_URL ,async(req,res)=>{

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




app.listen(PORT,()=>{
    console.log("Server is working at http://localhost:5000");
})