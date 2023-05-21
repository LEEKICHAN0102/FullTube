import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = process.env.PORT || 7777;

const handleListening = () => {
  console.log("Server Listening to localhost:7777 🔥🔥");
};

app.listen(PORT, handleListening);
