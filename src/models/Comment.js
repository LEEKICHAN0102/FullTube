import mongoose from "mongoose";

const commentSchema=new mongoose.Schema({
  text:{type:String,required:true},
  createdAt: { type: Date, required: true, default: Date.now },
  owner: {type: mongoose.Schema.Types.ObjectId,required: true,ref: "User",},
  video:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Video"},
  avatarUrl:{type:String, required:true,ref:"User"},
});

const commentModel=mongoose.model("Comment",commentSchema);

export default commentModel;