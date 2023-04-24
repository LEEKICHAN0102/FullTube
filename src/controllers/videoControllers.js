import videoModel from "../models/Video";

export const homeVideo = async (req, res) => {
  const videos = await videoModel.find({});
  return res.render("home", { pageTitle: "Home", videos });
};

export const watchVideo = async (req, res) => {
  const { id } = req.params;
  const video = await videoModel.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "404 Error" });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEditVideo = async (req, res) => {
  const { id } = req.params;
  const video = await videoModel.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "404 Error" });
  }
  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};

export const postEditVideo = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await videoModel.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "404 Error" });
  }
  await videoModel.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: hashtags
      .split(",")
      .map((word) => (word.startsWith("#") ? word : `#${word}`)),
  });
  return res.redirect(`/video/${id}`);
};

export const getUploadVideo = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUploadVideo = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await videoModel.create({
      title,
      description,
      hashtags,
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
