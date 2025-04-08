const mongoose = require("mongoose");
const plm = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  profileImage: {
    type: String,
    default: ""
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }]
}, { timestamps: true });

userSchema.plugin(plm);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
