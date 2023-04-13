import express from "express";
import { WatchVideo, editVideo } from "../controllers/videoControllers";

const videoRouter = express.Router();

videoRouter.get("/watch", WatchVideo);
videoRouter.get("/edit", editVideo);

export default videoRouter;
