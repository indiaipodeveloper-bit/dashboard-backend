// import express from "express";
// import dotenv from "dotenv";
// import { connect } from "./config/dbconnection.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import { AdminRouter } from "./routes/Routes.js";
// import { UserRouter } from "./routes/UserRoutes.js";
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(
//   cors({
//     origin: "https://dashboard-frontend-smoky.vercel.app",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   })
// );

// app.use(cookieParser());
// app.use(express.json());


// app.use("/uploads/profiles", express.static("uploads/profiles"));


// app.use("/admin",AdminRouter)
// app.use("/",UserRouter)

// app.get("/",(req,res)=>{
//   return res.send("dashboard backend")
// })

// console.log(process.env.MONGOURI)
// connect(process.env.MONGOURI)

//   .then(() => {
//     console.log("db connected");
//     app.listen(PORT, () => {
//       console.log("App runnin on PORT", PORT);
//     });
//   })
//   .catch((er) => {
//     console.log(er);
//   });



import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { AdminRouter } from "../routes/Routes.js";
import { UserRouter } from "../routes/UserRoutes.js";
import serverless from "serverless-http";
import { connect } from "./config/dbconnection.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://dashboard-frontend-smoky.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/uploads/profiles", express.static("uploads/profiles"));

app.use("/admin", AdminRouter);
app.use("/", UserRouter);

app.get("/", (req, res) => {
  res.send("Dashboard backend running on Vercel 🚀");
});

await connect(process.env.MONGOURI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB error ❌", err));

export const handler = serverless(app);
