import express from "express";
import { registerView,createComment,deleteComment ,videoLike,subscribeChannel} from "../controllers/videoControllers";

const apiRouter = express.Router();

apiRouter.post("/video/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/video/:id([0-9a-f]{24})/comment", createComment);
apiRouter.post("/video/:id([0-9a-f]{24})/like", videoLike);
apiRouter.post("/video/:id([0-9a-f]{24})/subscribe", subscribeChannel);
apiRouter.delete("/video/:id([0-9a-f]{24})/delete", deleteComment);




export default apiRouter;