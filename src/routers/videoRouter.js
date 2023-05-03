import express from "express";
import {
  watchVideo,
  getEditVideo,
  postEditVideo,
  getUploadVideo,
  postUploadVideo,
  deleteVideo,
} from "../controllers/videoControllers";
import { protectorMiddleware, videoUpload } from "../middlewares";

const videoRouter = express.Router();

//hexadecimal RegExp
videoRouter.get("/:id([0-9a-f]{24})", watchVideo);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getEditVideo)
  .post(postEditVideo);
videoRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware)
  .get(deleteVideo);
videoRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUploadVideo)
  .post(videoUpload.single("video"), postUploadVideo);

export default videoRouter;
