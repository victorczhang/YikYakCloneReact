const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PostsSchema = new Schema({
  post: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 0
  },
  voters: {
    type: Array
  },
  upvotedBy: {
    type: Array
  },
  downvotedBy: {
    type: Array
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  replies: {
    type: Number,
    default: 0
  },
  comments: {
    type: Array
  },
  user_id: {
    type: 'string'
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

module.exports = Posts = mongoose.model("posts", PostsSchema);