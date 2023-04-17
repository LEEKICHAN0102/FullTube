let videos = [
  {
    title: "First Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 1,
  },
  {
    title: "Second Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 2,
  },
];

export const homeVideo = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos });
};

export const watchVideo = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
};

export const editVideo = (req, res) => {
  const { id } = req.params;
  const editVideo = videos[id - 1];
  return res.render("edit", {
    pageTitle: `Editing ${editVideo.title}`,
    editVideo,
  });
};

export const deleteVideo = (req, res) => {
  return res.send("Delete Video");
};

export const uploadVideo = (req, res) => {
  return res.send("Upload Video");
};
