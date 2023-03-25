const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    origin:String,
    category:String,
    VID:String,  //Vinish ID
    ResID:String, //Resident ID
})

const User = new mongoose.model("User",userSchema);


module.exports = User;