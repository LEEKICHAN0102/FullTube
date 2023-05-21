import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = 7777;

const handleListening = () => {
  console.log(`Server Listening to localhost:${PORT} 🔥🔥`);
};

app.listen(PORT, handleListening);
