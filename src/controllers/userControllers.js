import userModel from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "회원 가입" });
};

export const postJoin = async (req, res) => {
  const { email, name, password, password2, username } = req.body;
  const pageTitle = "회원 가입";
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "비밀번호를 틀렸습니다. 재입력 해주세요.",
    });
  }
  const exist = await userModel.exists({ $or: [{ username }, { email }] });
  if (exist) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "이미 사용 중인 E-mail 또는 닉네임 입니다.",
    });
  }
  try {
    await userModel.create({
      email,
      name,
      password,
      username,
    });
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: error._message,
    });
  }
  return res.redirect("/login");
};

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: `로그인` });
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email, socialOnly: false });
  const pageTitle = "로그인";
  if (!user) {
    res.status(400).render("login", {
      pageTitle,
      errorMessage: "Email이 일치 하지 않습니다.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    res.status(400).render("login", {
      pageTitle,
      errorMessage: "비밀번호가 일치 하지 않습니다.",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const editUser = (req, res) => {
  return res.render("edit", { pageTitle: "Edit" });
};

export const deleteUser = (req, res) => {
  return res.render("delete", { pageTitle: "Delete" });
};

export const startGithubLogin = (req, res) => {
  const baseURL = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalURL = `${baseURL}?${params}`;
  return res.redirect(finalURL);
};

export const finishGithubLogin = async (req, res) => {
  const baseURL = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalURL = `${baseURL}?${params}`;
  const tokenRequest = await (
    await fetch(finalURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    console.log(userData);
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await userModel.findOne({ email: emailObj.email });
    if (!user) {
      user = await userModel.create({
        avatarUrl: userData.avatar_url,
        email: emailObj.email,
        name: userData.login,
        password: "",
        socialOnly: true,
        username: userData.name,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};
//fetch >https://velog.io/@seoltang/fetch-POST-Request

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
