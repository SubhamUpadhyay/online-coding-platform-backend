const app = require("./app")
const connectDB = require("./config/db");

const PORT = 3000;

const startServer = async()=>{
    try{
        await connectDB();
        app.listen(PORT,()=>{
            console.log(`Server started at port ${PORT}`);
        })
    }catch(error)
    {
        console.log(error.message);
    }
};
startServer();