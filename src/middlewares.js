export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "FullTube";
  res.locals.loggedInUser = req.session.user;
  next();
};

//Template 에서 session의 값을 받아 올 수 없기에 locals로 그 값을 받아서 유저가 로그인 하였는지 등의 Object를 확인 할 수 있는 것.
