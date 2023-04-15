const User = {
  username: "kicahn",
  loggedIn: true,
};

export const mainVideo = (req, res) => {
  res.render("home", { pageTitle: "Home", User });
};

export const watchVideo = (req, res) => {
  return res.render("watch", { pageTitle: "Watch" });
};

export const editVideo = (req, res) => {
  return res.send("edit Video");
};
