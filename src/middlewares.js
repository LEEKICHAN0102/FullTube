import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3=new aws.S3({
  credentials:{
    accessKeyId:process.env.AWS_ID,
    secretAccessKey:process.env.AWS_SECRET
  }
})

const multerUploader=multerS3({
  s3: s3,
  bucket: 'FullTubeOnly'
});

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "FullTube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

//Template 에서 session의 값을 받아 올 수 없기에 locals로 그 값을 받아서 유저가 로그인 하였는지 등의 Object를 확인 할 수 있는 것.

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: { fileSize: 3000000 },
  storage:multerUploader,
});

export const videoUpload = multer({
  dest: "uploads/videos/",
  storage:multerUploader,
});
