import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        unique:true,
        required:true
    },
    image:{
        type:String,
    }
},{timestamps:true})


export const Blog = mongoose.model("blogs",BlogSchema)