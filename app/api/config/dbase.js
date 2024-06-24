import mongoose from "mongoose";
// const env = require('./envConfig');

export async function Connect() {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connected..!")
    }catch(error){
        console.log(error.message);
        process.exit;
    }
}
// module.exports = Connect;