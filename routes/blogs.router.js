const {
  getBlogs,
  postBlogs,
  deleteBlogs,
  updateBlogs,
  searchBlogs,
} = require("../controllers/blogs.controllers");

const blogsRouter = require("express").Router();

blogsRouter.get("/", getBlogs);
blogsRouter.post("/new", postBlogs);
blogsRouter.get("/search", searchBlogs);
blogsRouter.put("/:id", updateBlogs);
blogsRouter.delete("/:id", deleteBlogs);

module.exports = blogsRouter;
