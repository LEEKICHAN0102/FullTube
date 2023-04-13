import express from "express";
import { joinUser } from "../controllers/userControllers";
import { mainVideo } from "../controllers/videoControllers";

const homeRouter = express.Router();

homeRouter.get("/", mainVideo); //video Controller(main Video)
homeRouter.get("/join", joinUser); //user Controller(join User)

export default homeRouter;
