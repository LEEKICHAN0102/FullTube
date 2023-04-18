import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/FullTube");

const db = mongoose.connection;

const handleOpen = () => console.log("Connect to DB✨");
const handleError = (error) => console.log("DB ERROR ❌", error);
db.on("error", handleError);
db.once("open", handleOpen);
