export const joinUser = (req, res) => {
  return res.send("ss");
};

export const loginUser = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const editUser = (req, res) => {
  return res.send("user Edit");
};

export const deleteUser = (req, res) => {
  return res.send("user delete");
};
