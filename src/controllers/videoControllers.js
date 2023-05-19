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

export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;
  const video = await videoModel.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  const userComment=await userModel.findById(user);
  if(!user){
    return res.sendStatus(404);
  }
  const comment = await commentModel.create({
    text,
    owner: user._id,
    video: id,
    avatarUrl:userComment.avatarUrl,
  });
  video.comments.push(comment._id);
  await video.save();
  userComment.comments.push(comment._id);
  await userComment.save();
  return res.status(201).json({ newCommentId: comment._id });
};

export const deleteComment = async (req, res) => {
  const { id: commentId } = req.params;
  const comment = await commentModel.findById(commentId);
  if (!comment) {
    return res.status(404);
  }
  await commentModel.findByIdAndDelete(commentId);
  return res.sendStatus(200);
};

export const videoLike=async(req,res)=>{
  const {
    session:
    {user:_id},
    params:{id},
  }=req;
  const video=await videoModel.findById(id);
  const user=await userModel.findById(_id);
  if(!video){
    return res.status(404);
  }
  if(!user){
    return res.status(404);
  }

  const likeV=await userModel.findOne({likeVideo:id});
  let likeCount;
  if(likeV){
    user.likeVideo.pull(id);
    await user.save();

    video.meta.rating.pull(_id);
    await video.save();
    likeCount=video.meta.rating.length;
    return res.status(201).json({likeCount});
  }
  user.likeVideo.push(id);
  await user.save();
  video.meta.rating.push(_id);
  await video.save();

  likeCount=video.meta.rating.length;

  return res.status(201).json({likeCount});
};

export const subscribeChannel=async(req,res)=>{
  const {
    session:{
      user:{_id},
    },
    params:{id},
  }=req;
  const user=await userModel.findById(_id);
  const video=await videoModel.findById(id);
  if(!user){
    return res.status(404);
  }
  if(!video){
    return res.status(404);
  }

  const userSubChannel=await userModel.findOne({subChannel:id});
  let check;
  if(userSubChannel){
    user.subChannel.pull(id);
    await user.save();

    video.meta.subscriber.pull(_id);
    await video.save();
    return res.status(201).json({check});
  }

  user.subChannel.push(id);
  await user.save();
  video.meta.subscriber.push(_id);
  await video.save();
  return res.status(201).json({check});
};