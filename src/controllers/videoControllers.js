export const mainVideo = (req, res) => {
  res.render("home");
};

export const WatchVideo = (req, res) => {
  return res.send("watch Video");
};

export const editVideo = (req, res) => {
  return res.send("edit Video");
};
