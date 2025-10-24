import { Blog } from "../models/BlogModel.js";
import fs, { renameSync, unlinkSync, existsSync } from "fs";

// Add new blog
export async function AddBlog(req, res) {
  try {
    const { title, slug, subDescription, description } = req.body;
    if (!title || !slug || !subDescription || !description) {
      return res.status(400).send("All The Details Are Required");
    }
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(400).send("Slug is Already Taken");
    }
    if (!req.file) {
      return res.status(400).send("Blog Image is Required");
    }
    const date = Date.now();
    let fileName = "uploads/blogs/" + date + req.file.originalname;
    renameSync(req.file.path, fileName);

    const blog = await Blog.create({
      title,
      slug,
      subDescription,
      description,
      image: fileName,
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

export async function EditBlog(req, res) {
  try {
    const allBlogs = await Blog.find({});
    return res.status(200).json({ allBlogs });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}

export async function DeleteBlog(req, res) {
  try {
    const { _id } = req.body;
    const blog = await Blog.findByIdAndDelete(_id);
    if (!blog) {
      return res.status(400).send("Blog Doesn't Exist");
    }
    if (existsSync(blog.image)) {
      unlinkSync(blog.image);
    }
    return res.status(200).send("Blog Deleted Successfully");
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}
