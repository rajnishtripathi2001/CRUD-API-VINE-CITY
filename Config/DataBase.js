const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://rajnishtripathi2001:patana1234@vinecity.mr9hxgy.mongodb.net/?retryWrites=true&w=majority")
.then(console.log("Connected to DB"))
.catch((err)=>{
    console.log(err)
})

