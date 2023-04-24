import express from "express";
import {
  watchVideo,
  getEditVideo,
  postEditVideo,
  getUploadVideo,
  postUploadVideo,
  deleteVideo,
} from "../controllers/videoControllers";

const videoRouter = express.Router();

//hexadecimal RegExp
videoRouter.get("/:id([0-9a-f]{24})", watchVideo);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .get(getEditVideo)
  .post(postEditVideo);
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo);
videoRouter.route("/upload").get(getUploadVideo).post(postUploadVideo);

export default videoRouter;
