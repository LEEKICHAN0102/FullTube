import express from "express";

const homeRouter = express.Router();

const handleHome = (req, res) => {
  return res.send("home");
};

homeRouter.get("/", handleHome);

export default homeRouter;
