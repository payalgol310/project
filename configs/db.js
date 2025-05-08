import mongoose from "mongoose";


function dbConnections(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("Connected to Mongodb"))
    .catch((err)=>console.log(err));
}


export default dbConnections;






