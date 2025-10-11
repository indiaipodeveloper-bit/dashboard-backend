import { Blog } from "../models/BlogModel.js";



// Add new blog
export async function AddBlog(req, res) {
  try {
    const { title, description, image, slug } = req.body;
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(400).send("Blog Already Exist");
    }
    const blog = await Blog.create({
      title,
      slug,
      description,
      image,
    });
    return res.status(200).json({ blog });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}



// list of all blogs
export async function getAllBlogs(req, res) {
  try {
    const allBlogs = await Blog.find({});
    return res.status(200).json({ allBlogs });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}
