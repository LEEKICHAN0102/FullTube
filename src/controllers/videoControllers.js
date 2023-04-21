import videoModel from "../models/Video";

export const homeVideo = async (req, res) => {
  const videos = await videoModel.find({});
  return res.render("home", { pageTitle: "Home", videos });
};

export const watchVideo = (req, res) => {
  return res.render("watch", { pageTitle: "Watching" });
};

export const getEditVideo = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.render("edit", { pageTitle: "Editing" });
};

export const postEditVideo = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/video/${id}`);
};

export const getUploadVideo = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUploadVideo = async (req, res) => {
  const { title, description, hashtags } = req.body;
  await videoModel.create({
    title,
    description,
    hashtags: hashtags.split(",").map((word) => `#${word}`),
    createdAt: Date.now(),
    meta: {
      views: 0,
      rating: 0,
    },
  });
  return res.redirect("/");
};
