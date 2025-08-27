const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");


const reviewerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }

}, {timestamps:true})

reviewerSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password, salt);
    next();
})

reviewerSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

const Reviewer=mongoose.model('User', reviewerSchema);
module.exports=Reviewer;





