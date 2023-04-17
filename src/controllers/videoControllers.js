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

export const getEditVideo = (req, res) => {
  const { id } = req.params;
  const editVideo = videos[id - 1];
  return res.render("edit", {
    pageTitle: `Editing ${editVideo.title}`,
    editVideo,
  });
};

export const postEditVideo = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title;
  return res.redirect(`/video/${id}`);
};

export const getUploadVideo = (req, res) => {
  return res.render("upload");
};

export const postUploadVideo = (req, res) => {
  const { title } = req.body;
  const newVideo = {
    title,
    rating: 0,
    comments: 0,
    createdAt: "1 minutes ago",
    views: 2,
    id: videos.length + 1,
  };
  videos.push(newVideo);
  return res.redirect("/");
};
