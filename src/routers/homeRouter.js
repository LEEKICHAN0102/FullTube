import express from "express";
import { joinUser, loginUser } from "../controllers/userControllers";
import { mainVideo } from "../controllers/videoControllers";

const homeRouter = express.Router();

homeRouter.get("/", mainVideo); //video Controller(main Video)
homeRouter.get("/join", joinUser); //user Controller(join User)
//only Logged In user or inside Log In user are +URL /user/
homeRouter.get("/login", loginUser);

export default homeRouter;
