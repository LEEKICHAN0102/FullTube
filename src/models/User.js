import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  name: { type: String, required: true },
  password: { type: String },
  username: { type: String, required: true, unique: true },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  comments:[
    {type:mongoose.Schema.Types.ObjectId,ref:"Comment"},
  ],
  likeVideo:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Video",
  }],
  subChannel:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Video",
  }]
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
