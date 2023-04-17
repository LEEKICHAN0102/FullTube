import express from "express";
import morgan from "morgan";
import homeRouter from "./routers/homeRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 7777;
const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/", homeRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

const handleListening = () => {
  console.log("Server Listening to localhost:7777 🔥🔥");
};

app.listen(PORT, handleListening);
