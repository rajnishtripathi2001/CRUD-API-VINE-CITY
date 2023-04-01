const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    title:String,
    date: Date,
    thumbnail:String,
    news:String,
})

const News = new mongoose.model("News",newsSchema);


module.exports = News;