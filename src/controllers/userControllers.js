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
  const user = await userModel.findOne({ email });
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
  return res.redirect("/");
};

export const editUser = (req, res) => {
  return res.render("edit", { pageTitle: "Edit" });
};

export const deleteUser = (req, res) => {
  return res.render("delete", { pageTitle: "Delete" });
};
