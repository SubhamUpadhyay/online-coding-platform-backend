const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        if(!name || !email ||!password)
        {
            return res.status(400).json({message:"All fields are required"});
        }
        const existingUser = await User.findOne({email});
        if(existingUser)
        {
            return res.status(400).json({message:"User already exist"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({name,email,password:hashedPassword});
        res.status(201).json({
            message:"User registered Successfully",
            userId:user._id
        })
    }catch(error){
        res.status(500).json({message:error.message});
        }
    }

const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password)
        {
            return res.status(400).json({message:"All fields required"});
        }
        const user = User.findOne({email});
        if(!user)
        {
            return res.status(400).json({message:"User doesn't exist"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const token = jwt.sign({id:user._id,role:user.role},"secret_key_subham",{expiresIn:"1d"});
        res.status(200).json({message:"Login Successful",token});
    }catch(error)
    {
        res.status(500).json({message:error.message});
    }
}

module.exports = {register,login};