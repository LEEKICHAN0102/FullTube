import "./db";
import videoModel from "./models/Video";
import userModel from "./models/User";
import app from "./server";

const PORT = 7777;

const handleListening = () => {
  console.log("Server Listening to localhost:7777 🔥🔥");
};

app.listen(PORT, handleListening);
