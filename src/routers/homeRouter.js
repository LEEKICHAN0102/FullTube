import express from "express";
import { joinUser, loginUser } from "../controllers/userControllers";
import { homeVideo, searchVideo } from "../controllers/videoControllers";

const homeRouter = express.Router();

homeRouter.get("/", homeVideo); //video Controller(main Video)
homeRouter.get("/login", loginUser);
homeRouter.get("/join", joinUser);
homeRouter.get("/search", searchVideo);
//user Controller(join User)
//only Logged In user or inside Log In user are +URL /user/

export default homeRouter;
