import express from "express";
import { watchVideo, editVideo } from "../controllers/videoControllers";

const videoRouter = express.Router();

videoRouter.get("/watch", watchVideo);
videoRouter.get("/edit", editVideo);

export default videoRouter;
