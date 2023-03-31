const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    country:String,
    username:String,
    password:String,
    category:String,
    VID:String,  //Vinish ID
    ResID:String, //Resident ID
})

const User = new mongoose.model("User",userSchema);


module.exports = User;