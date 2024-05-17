const mongoose = require("mongoose");
const validator = require("validator");

// const authorSchema = new mongoose.Schema(
//   {
//     email: {
//       type: String,
//       required: true,
//       maxlength: 50,
//       validate: (value) => validator.isEmail(value),
//     },
//     fullname: { type: String, maxlength: 20 },
//   },
//   { _id: false }
// );
// author: { type: [authorSchema] },
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 100, unique: true },
    body: { type: String, maxlength: 100 },
    userId: { type: Number, maxlength: 3 },
    reactions: { type: Number },
    tags: { type: [String] },
  },
  { timestamps: true }
);

const BlogsModel = new mongoose.model("Blog", blogSchema, "blog");

module.exports = BlogsModel;
