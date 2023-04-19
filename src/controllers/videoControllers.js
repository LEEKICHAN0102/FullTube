import videoModel from "../models/Video";

export const homeVideo = async (req, res) => {
  const videos = await videoModel.find({});
  return res.render("home", { pageTitle: "Home", videos: [] });
}; // i spend all day's fx coding challenge

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

export const postUploadVideo = (req, res) => {
  const { title } = req.body;
  return res.redirect("/");
};
