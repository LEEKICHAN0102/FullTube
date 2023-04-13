import express from "express";
import morgan from "morgan";
import homeRouter from "./routers/homeRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 7777;
const app = express();
const logger = morgan("dev");
app.use(logger);

app.use("/", homeRouter);
app.use("/users", userRouter);
app.use("/watch", videoRouter);

const handleListening = () => {
  console.log("Server Listening to localhost:7777 🔥🔥");
};

app.listen(PORT, handleListening);
