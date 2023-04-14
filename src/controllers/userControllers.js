export const joinUser = (req, res) => {
  res.render("watch");
};

export const loginUser = (req, res) => {
  res.render("base");
};

export const editUser = (req, res) => {
  return res.send("user Edit");
};

export const deleteUser = (req, res) => {
  return res.send("user delete");
};
