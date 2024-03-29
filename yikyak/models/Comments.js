const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CommentSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user_id: {
    type: 'string',
  },
  post_id: {
      type: 'string',
      required: true
  },
  upvotedBy: {
    type: Array
  },
  downvotedBy: {
    type: Array
  },
  deleted: {
    type: Boolean,
    default: false
  },
  points: {
    type: Number,
    default: 0
  }
});

module.exports = Comments = mongoose.model("comments", CommentSchema);