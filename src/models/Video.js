import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  fileUrl: { type: String, required: true },
  description: { type: String, required: true, trim: true },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, required: true, trim: true }],
  thumbnail: {type: String, required: true},
  meta: {
    views: { type: Number, default: 0, required: true },
    rating:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
    }],
    subscriber:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
    }]
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  comments:[
    {type:mongoose.Schema.Types.ObjectId,ref:"Comment"},
  ],
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const videoModel = mongoose.model("Video", videoSchema);

export default videoModel;
