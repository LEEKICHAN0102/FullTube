import express from "express";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userControllers";
import { homeVideo, searchVideo } from "../controllers/videoControllers";
import { publicOnlyMiddleware } from "../middlewares";

const homeRouter = express.Router();

homeRouter.get("/", homeVideo); //video Controller(main Video)
homeRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
homeRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
homeRouter.get("/search", searchVideo);
//user Controller(join User)
//only Logged In user or inside Log In user are +URL /user/

export default homeRouter;
