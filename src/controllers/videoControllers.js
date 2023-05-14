import commentModel from "../models/Comment";
import userModel from "../models/User";
import videoModel from "../models/Video";

export const homeVideo = async (req, res) => {
  const videos = await videoModel.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: "Home", videos });
};

export const watchVideo = async (req, res) => {
  const { id } = req.params;
  const video = await videoModel.findById(id).populate("owner").populate("comments");
  if (!video) {
    return res.render("404", { pageTitle: "404 Error" });
  }
  console.log(video);
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEditVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await videoModel.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "404 Error" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `비디오 수정: ${video.title}`, video });
};

export const postEditVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const { title, description, hashtags } = req.body;
  const video = await videoModel.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "404 Error" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await videoModel.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: videoModel.formatHashtags(hashtags),
  });
  return res.redirect(`/video/${id}`);
};

export const getUploadVideo = (req, res) => {
  return res.render("upload", { pageTitle: "영상 업로드" });
};

export const postUploadVideo = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { path: fileUrl } = req.file;
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await videoModel.create({
      title,
      description,
      fileUrl,
      owner: _id,
      hashtags: videoModel.formatHashtags(hashtags),
    });
    const user = await userModel.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { id } = req.params;
  const video = await videoModel.findById(id);
  const user = await userModel.findById(_id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "404 Error" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await videoModel.findByIdAndDelete(id);
  user.videos.splice(user.videos.indexOf(id), 1);
  user.save();
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
  return res.render("search", { pageTitle: "검색", videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await videoModel.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

export const createComment=async(req,res)=>{
  const {
    session:{user},
    body:{text},
    params:{id},
  }=req;

  const video=await videoModel.findById(id);

  if(!video){
    return res.sendStatus(404); 
  }
  const comment =await commentModel.create({
    text,
    owner:user._id,
    video:id,
  })
  video.comments.push(comment._id);
  video.save();
  return res.sendStatus(201);
};

export const likeVideo=async(req,res)=>{};