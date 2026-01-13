const express = require("express");
const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Online Coding Platfrom Backend is running");
});

module.exports = app;