import express from "express";
import {
  logout,
  editUser,
  deleteUser,
  startGithubLogin,
  finishGithubLogin,
  startNaverLogin,
  finishNaverLogin,
  startKaKaoLogin,
  finishKaKaoLogin,
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", editUser);
userRouter.get("/delete", deleteUser);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/naver/start", startNaverLogin);
userRouter.get("/naver/finish", finishNaverLogin);
userRouter.get("/kakao/start", startKaKaoLogin);
userRouter.get("/kakao/finish", finishKaKaoLogin);

export default userRouter;
