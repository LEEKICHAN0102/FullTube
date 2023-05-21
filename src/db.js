import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL)
  .then(()=>console.log('connected'))
  .catch(e=>console.log(e));

const db = mongoose.connection;

const handleOpen = () => console.log("Connect to DB✨");
const handleError = (error) => console.log("DB ERROR ❌", error);
db.on("error", handleError);
db.once("open", handleOpen);
