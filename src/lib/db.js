import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://taskuser:IlVEWWThQ4aPKrjj@cluster0.yij9p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
console.log(process.env.MONGO_URI);


export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(MONGO_URI, { dbName: "finance" });
};
