import express from "express";
import {
  watchVideo,
  editVideo,
  deleteVideo,
  uploadVideo,
} from "../controllers/videoControllers";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)/watch", watchVideo);
videoRouter.get("/:id(\\d+)/edit", editVideo);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);
videoRouter.get("/upload", uploadVideo);

export default videoRouter;
