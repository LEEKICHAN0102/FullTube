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

export const startNaverLogin = (req, res) => {
  const baseURL = "https://nid.naver.com/oauth2.0/authorize";
  const config = {
    response_type: "code",
    client_id: process.env.NV_CLIENT,
    redirect_uri: "http://localhost:7777/user/naver/finish",
    state: process.env.NV_STATE,
  };
  const params = new URLSearchParams(config).toString();
  const finalURL = `${baseURL}?${params}`;
  return res.redirect(finalURL);
};

export const finishNaverLogin = async (req, res) => {
  const baseURL = "https://nid.naver.com/oauth2.0/token";
  const config = {
    grant_type: "authorization_code",
    client_id: process.env.NV_CLIENT,
    client_secret: process.env.NV_SECRET,
    code: req.query.code,
    state: process.env.NV_STATE,
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
    const userData = await (
      await fetch("https://openapi.naver.com/v1/nid/me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();
    console.log(userData);
    let user = await userModel.findOne({ email: userData.response.email });
    if (!user) {
      user = await userModel.create({
        avatarUrl: userData.response.profile_image,
        email: userData.response.email,
        name: userData.response.name,
        password: "",
        socialOnly: true,
        username: userData.response.nickname,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/login");
  }
};

export const startKaKaoLogin = (req, res) => {
  const baseURL = "https://kauth.kakao.com/oauth/authorize";
  const config = {
    client_id: process.env.KK_REST,
    redirect_uri: "http://localhost:7777/user/kakao/finish",
    response_type: "code",
  };
  const params = new URLSearchParams(config).toString();
  const finalURL = `${baseURL}?${params}`;
  return res.redirect(finalURL);
};
export const finishKaKaoLogin = async (req, res) => {
  const baseUrl = "https://kauth.kakao.com/oauth/token";
  const config = {
    client_id: process.env.KK_REST,
    client_secret: process.env.KK_SECRET,
    grant_type: "authorization_code",
    redirect_uri: "http://localhost:7777/user/kakao/finish",
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const KaKaoTokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    })
  ).json();
  console.log(KaKaoTokenRequest);
  if ("access_token" in KaKaoTokenRequest) {
    const { access_token } = KaKaoTokenRequest;
    const userData = await (
      await fetch("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-type": "application/json",
        },
      })
    ).json();
    console.log(userData);
    const KaKaoAccount = userData.kakao_account;
    const KaKaoProfile = KaKaoAccount.profile;

    if (
      KaKaoAccount.is_email_valid === false ||
      KaKaoAccount.is_email_verified === false
    ) {
      return res.redirect("/login");
    }
    let user = await userModel.findOne({ email: KaKaoAccount.email });
    if (!user) {
      user = await userModel.create({
        name: KaKaoProfile.nickname,
        socialOnly: true,
        username: KaKaoProfile.nickname,
        email: KaKaoAccount.email,
        password: "",
        avatarUrl: KaKaoProfile.profile_image_url,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const getEdit = (req, res) => {
  return res.render("edit-profile", { pageTitle: "프로필 수정" });
};

export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { email, username, name },
    file,
  } = req;
  const existUsername = await userModel.findOne({ username });
  const existUserEmail = await userModel.findOne({ email });
  if (existUsername.id != _id || existUserEmail.id != _id) {
    return res.render("edit-Profile", {
      pageTitle: "프로필 수정",
      errorMessage: "이미 존재하는 E-mail 또는 닉네임 입니다.",
    });
  } else {
    const updatedUser = await userModel.findByIdAndUpdate(
      _id,
      {
        name,
        email,
        username,
      },
      { new: true }
    );
    req.session.user = updatedUser;
    return res.redirect("edit-profile");
  }
};

export const getChangePassword = (req, res) => {
  return res.render("change-password", { pageTitle: "비밀번호 변경" });
};
export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id, password },
    },
    body: { oldPassword, newPassword, newPasswordConfirm },
  } = req;
  const user = await userModel.findById(_id);
  const passwordCheck = await bcrypt.compare(oldPassword, user.password);
  if (!passwordCheck) {
    return res.status(400).render("change-password", {
      pageTitle: "비밀번호 변경",
      errorMessage: "기존 비밀번호가 일치하지 않습니다",
    });
  }
  if (newPassword !== newPasswordConfirm) {
    return res.status(400).render("change-password", {
      pageTitle: "비밀번호 변경",
      errorMessage: "새로운 비밀번호(확인)가 일치하지 않습니다",
    });
  }
  user.password = newPassword;
  await user.save();
  return res.redirect("/user/logout");
};

export const deleteUser = (req, res) => {
  return res.render("delete", { pageTitle: "Delete" });
};
