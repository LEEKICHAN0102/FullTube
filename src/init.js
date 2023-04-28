import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 7777;

const handleListening = () => {
  console.log("Server Listening to localhost:7777 🔥🔥");
};

app.listen(PORT, handleListening);
