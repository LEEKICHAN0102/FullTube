import express from "express";

const videoRouter = express.Router();

const handleWatchVideo = (req, res) => {
  return res.send("Watch Video");
};

videoRouter.get("/video", handleWatchVideo);

export default videoRouter;
