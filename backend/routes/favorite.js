const express = require("express");
const Reviewer = require("../models/User");
const router = express.Router();
const protect=require('../middlewares/auth');

//add book to favorite
router.post('/favorite/:id', protect, async(req, res)=>{

})

//get all favorites in the favorites page
router.get('/favorite', protect, async (req,res)=>{
    
})

//remove/delte from favorite
router.delete('/favorite/:id', protect, async(req,res)=>{

})





module.exports=router;