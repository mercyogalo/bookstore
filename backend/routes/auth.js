const express=require("express");
const Reviewer=require("../models/User");
const router=express.Router();
const protect=require("../middlewares/auth");
const jwt=require("jsonwebtoken");
const generateToken=require("../Utils/token");


//register user
router.post('/register', async (req,res) =>{
    const { name, email, password } = req.body;
    try {
        if(!username || !password || !email){
            return res.status(400).json({message:"PLease enter all fields"});
        }

        const userExists=await Reviewer.findOne({email});

        if(userExists){
            return res.status(400).json({message:"This user already exists"});
        }

        const reviewer=await Reviewer.create({name, email, password});
        const token=generateToken(reviewer._id);
        res.status(201).json({
             userID:user._id,
            username:user.username,
            email:user.email,
            token,
        })

    } catch (error) {
        return res.status(500).json({message:"Server error in signup"});
    }
})




//login user
router.post('/login', async (req, res) => {
    const { email, password }= req.body;
    try {
        
        if(!email || !password){
            res.status(400).json({message:"Please enter all fields"});
        }

        const reviewer=await Reviewer.findOne({email});
        const token=generateToken(reviewer._id);

        if(!user || !(await reviewer.matchPassword(password))){
            res.status(401).json({message:"Invalid creadentials"});
        }

        res.status(200).json({
            userID:user._id,
            username:user.username,
            email:user.email,
              token,
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error in login"})
    }
})


module.exports=router;