import express from "express";
import dotenv from "dotenv";
import { connect } from "./config/dbconnection.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { AdminRouter } from "./routes/Routes.js";
import { UserRouter } from "./routes/UserRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(cookieParser());
app.use(express.json());


app.use("/uploads/profiles", express.static("uploads/profiles"));


app.use("/admin",AdminRouter)
app.use("/",UserRouter)

app.get("/",(req,res)=>{
  return res.send("dashboard backend")
})

console.log(process.env.MONGOURI)
connect(process.env.MONGOURI)

  .then(() => {
    console.log("db connected");
    app.listen(PORT, () => {
      console.log("App runnin on PORT", PORT);
    });
  })
  .catch((er) => {
    console.log(er);
  });
