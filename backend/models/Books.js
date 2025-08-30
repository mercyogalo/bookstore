const mongoose=require("mongoose");

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,
        default: "default-book.png"
    },
    
})