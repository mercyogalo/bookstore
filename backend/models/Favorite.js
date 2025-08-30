const mongoose=require("mongoose");
const Reviewer=require("./User");


const favoriteSchema=new mongoose.Schema({
    reviewer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Reviewer",
        required:true
    },
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})


const Favorite=("Favorite", favoriteSchema)
