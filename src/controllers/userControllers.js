import userModel from "../models/User";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "회원 가입" });
};

export const postJoin = async (req, res) => {
  const { email, name, password, password2, username } = req.body;
  const exist = await userModel.exists({ $or: [{ username }, { email }] });
  const pageTitle = "회원 가입";
  if (password !== password2) {
    return res.render("join", {
      pageTitle,
      errorMessage: "비밀번호를 틀렸습니다. 재입력 해주세요.",
    });
  }
  if (exist) {
    return res.render("join", {
      pageTitle,
      errorMessage: "이미 사용 중인 E-mail 또는 닉네임 입니다.",
    });
  }
  await userModel.create({
    email,
    name,
    password,
    username,
  });
  return res.redirect("/login");
};

export const loginUser = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const editUser = (req, res) => {
  return res.render("edit", { pageTitle: "Edit" });
};

export const deleteUser = (req, res) => {
  return res.render("delete", { pageTitle: "Delete" });
};
