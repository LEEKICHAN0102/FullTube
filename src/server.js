import express from "express";
import morgan from "morgan";

const PORT = 7777;
const app = express();
const logger = morgan("dev");

const handleHome = (req, res) => {
  return res.send("hi");
};

app.use(logger);
app.get("/", handleHome);

const handleListening = () => {
  console.log("Server Listening to localhost:7777 🔥🔥");
};

app.listen(PORT, handleListening);
