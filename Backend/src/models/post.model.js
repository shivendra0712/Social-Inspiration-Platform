const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postcaption: {
    type: String,
    required: true,
    trim: true
  },
  image:{
    type:String
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'

  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  postLikes: [{
    type: Array,
    default:[]
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "User"
  }]
}, { timestamps: true });

const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;
