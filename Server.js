//--- Importing all required modules ----
require('dotenv').config();
const cors = require('cors');
const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require('./Model/User');
const News = require('./Model/News');

//Declaring PORT NUMBER
const PORT = process.env.PORT || 5000

// Declaring Express App
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

// Connecting Database
mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connected to DB"))
.catch((err)=>{
    console.log(err)
})

//--------- User Management API -----------------
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/"+"index.html")
})

//------------------------USER API ------------------------------

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

//------------------------NEWS API--------------------------------------

// Create News
app.post(process.env.NEWS_CREATE_URL ,async(req,res)=>{
    const news = await News.create(req.body)
    res.status(201).json({
        success:true,
        news
    })
}) 

// Read News
app.get(process.env.NEWS_READ_URL ,async(req,res)=>{
    const news_list = await News.find()
    res.status(200).json({
        success:true,
        news_list
    })
})

//update News
app.put(process.env.NEWS_UPDATE_AND_DELETE_URL ,async(req,res)=>{

    let news = await News.findById(req.params.id)

    if(news){
        news = await News.findByIdAndUpdate(req.params.id,req.body,)
    
        res.status(200).json({
            success:true,
            news
        })
    }
    else{
        res.status(500).json({
            success:false,
            message:"news not found"
        })
    }   
})

// Delete News
app.delete(process.env.NEWS_UPDATE_AND_DELETE_URL ,async(req,res)=>{

    let news = await News.findByIdAndRemove(req.params.id)

    if(!news){
        return res.status(500).json({
            success:false,
            message:"user not found"
        })
    }

    res.status(200).json({
        success:true,
        message:"user deleted"
    })
    
})



app.listen(PORT,()=>{
    console.log("Server is working at http://localhost:5000");
})