const mongoose = require('mongoose')
const connectDB = async()=>{
    try{
        await mongoose.connect("mongodb+srv://Subham:subham04@pratice.trfvamc.mongodb.net/online_coding_platform");
        console.log("MongoDB connected Successfully");
    }catch(error)
        {
            console.log("MongoDB connection Failed",error.message);
            process.exit(1);
        }
};

module.exports = connectDB;