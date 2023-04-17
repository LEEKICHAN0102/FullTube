export const joinUser = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
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
