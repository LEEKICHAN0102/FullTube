import express from "express";
import {
  seeUser,
  logout,
  getEdit,
  postEdit,
  deleteUser,
  startGithubLogin,
  finishGithubLogin,
  startNaverLogin,
  finishNaverLogin,
  startKaKaoLogin,
  finishKaKaoLogin,
  getChangePassword,
  postChangePassword,
} from "../controllers/userControllers";
import {
  avatarUpload,
  protectorMiddleware,
  publicOnlyMiddleware,
} from "../middlewares";

const userRouter = express.Router();

userRouter.route("/edit-profile").all(protectorMiddleware).get(getEdit).post(avatarUpload.single("avatar"), postEdit);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/:id", seeUser);
userRouter.get("/delete", deleteUser);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/naver/start", startNaverLogin);
userRouter.get("/naver/finish", finishNaverLogin);
userRouter.get("/kakao/start", startKaKaoLogin);
userRouter.get("/kakao/finish", finishKaKaoLogin);

export default userRouter;
