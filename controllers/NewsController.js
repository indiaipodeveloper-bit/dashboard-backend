import { News } from "../models/NewsSchema.js";
import fs, { renameSync, existsSync, unlinkSync } from "fs";

// list of all news
export async function getAllNews(req, res) {
  try {
    const allNews = await News.find({});
    return res.status(200).json({ allNews });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}

export async function AddNews(req, res) {
  try {
    const { title, subDescription, description } = req.body;
    if (!title || !subDescription || !description) {
      return res.status(400).send("All The Details Are Required");
    }
    if (!req.file) {
      return res.status(400).send("News Image is Required");
    }
    const existingNews = await News.findOne({ title });
    if (existingNews) {
      return res.status(400).send("News Already Exists");
    }
    const date = Date.now();
    let fileName = "uploads/news/" + date + req.file.originalname;
    renameSync(req.file.path, fileName);
    const news = await News.create({
      title,
      subDescription,
      description,
      image: fileName,
    });
    return res.status(200).json({ news });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}

export async function EditNews(req, res) {
  try {
    const { title, description, subDescription, _id } = req.body;
    const news = await News.findOne({ _id });
    news.title = title;
    news.description = description;
    news.subDescription = subDescription;

    if (req.file) {
      const fileName = "uploads/news/" + Date.now() + req.file.originalname;
      if (existsSync(news.image)) {
        unlinkSync(news.image);
      }
      renameSync(req.file.path, fileName);
      news.image = fileName;
    }
    await news.save();
    return res.status(200).json({ news });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}

export async function DeleteNews(req, res) {
  try {
    const { _id } = req.body;
    const news = await News.findByIdAndDelete(_id);
    if (!news) {
      return res.status(400).send("News Doesn't Exist");
    }
    if (existsSync(news.image)) {
      unlinkSync(news.image);
    }
    return res.status(200).json({ news, msg: "News Deleted Successfully" });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}
