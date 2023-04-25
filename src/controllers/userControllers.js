import userModel from "../models/User";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "회원 가입" });
};

export const postJoin = async (req, res) => {
  const { email, name, password, username } = req.body;
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
