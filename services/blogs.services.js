const Blogs = require("../model/blogs.model");

class BlogServices {
  getAll = async () => {
    const blog = await Blogs.find({});
    return blog;
  };

  post = async (body) => {
    const newBlog = new Blogs({ ...body });
    const result = await newBlog.save();
    return result;
  };

  delete = async (id) => {
    const result = await Blogs.findOneAndDelete({ _id: id });
    return result;
  };

  update = async (id, body) => {
    const result = await Blogs.findOneAndUpdate(
      { _id: id },
      { ...body },
      { new: true }
    );
    return result;
  };

  search = async (title) => {
    const result = await Blogs.find({
      title: { $regex: new RegExp(title) },
    });
    return result;
  };
}

module.exports = BlogServices;
