// const Blogs = require("../model/blogs.model");
const BlogServices = require("../services/blogs.services");
const Blogs = new BlogServices();

const getBlogs = async (request, response) => {
  try {
    const blog = await Blogs.getAll();
    return response.status(200).json(blog);
  } catch (error) {
    response
      .status(404)
      .json({ message: "Could not fetch blogs from db", error });
  }
};

const postBlogs = async (request, response) => {
  try {
    const result = await Blogs.post({ ...request.body });
    return response.status(200).json(result);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

const deleteBlogs = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Blogs.delete(id);
    return response.json(result);
  } catch {
    response
      .status(500)
      .json({ message: "Could not delete the blogs, please try again" });
  }
};

const updateBlogs = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Blogs.update(id, { ...request.body });
    return response.json(result);
  } catch {
    response
      .status(500)
      .json({ message: "Could not update the blogs, please try again" });
  }
};

const searchBlogs = async (request, response) => {
  const { title } = request.query;

  const result = await Blogs.search(title);

  response.json(result);
};

module.exports = { getBlogs, postBlogs, deleteBlogs, updateBlogs, searchBlogs };
