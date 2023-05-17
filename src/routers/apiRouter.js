import express from "express";
import { registerView,createComment,deleteComment ,videoLike} from "../controllers/videoControllers";

const apiRouter = express.Router();

apiRouter.post("/video/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/video/:id([0-9a-f]{24})/comment", createComment);
apiRouter.post("/video/:id([0-9a-f]{24})/like", videoLike);
apiRouter.delete("/video/:id([0-9a-f]{24})/delete", deleteComment);




export default apiRouter;