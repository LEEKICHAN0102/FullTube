import userModel from "../models/User";
import videoModel from "../models/Video";

export const homeVideo = async (req, res) => {
  const videos = await videoModel.find({}).sort({ createdAt: "desc" });
  return res.render("home", { pageTitle: "Home", videos });
};

export const watchVideo = async (req, res) => {
  const { id } = req.params;
  const video = await videoModel.findById(id).populate("owner");
  if (!video) {
    return res.render("404", { pageTitle: "404 Error" });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEditVideo = async (req, res) => {
  const { id } = req.params;
  const video = await videoModel.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "404 Error" });
  }
  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};

export const postEditVideo = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await videoModel.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "404 Error" });
  }
  await videoModel.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: videoModel.formatHashtags(hashtags),
  });
  return res.redirect(`/video/${id}`);
};

export const getUploadVideo = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUploadVideo = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { path: fileUrl } = req.file;
  const { title, description, hashtags } = req.body;
  try {
    await videoModel.create({
      title,
      description,
      fileUrl,
      owner: _id,
      hashtags: videoModel.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await videoModel.findByIdAndDelete(id);
  return res.redirect("/");
};

export const searchVideo = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await videoModel.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    });
  }
  return res.render("search", { pageTitle: "Search Video", videos });
};
