const fakeUser = {
  username: "kichan",
  loggedIn: true,
};

export const mainVideo = (req, res) => {
  res.render("home", { pageTitle: "Home", fakeUser });
};

export const watchVideo = (req, res) => {
  return res.render("watch", { pageTitle: "Watch" });
};

export const editVideo = (req, res) => {
  return res.send("edit Video");
};
