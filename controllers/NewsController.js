import { News } from "../models/NewsSchema.js";

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
    const { title, description, subdescription, categories } = req.body;
    const news = await News.create({
      title,
      description,
      subdescription,
      categories,
    });
    return res.status(200).json({news})
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}
