import express from "express";
import {
  AddNewMeeting,
  getAllMeetings,
} from "../controllers/MeetingsController.js";
import {
  EditFinancialDetails,
  getAllFinancialDetails,
} from "../controllers/FinancialController.js";
import {
  EditBusinessDetails,
  getAllBusinessDetails,
} from "../controllers/BusinessController.js";
import {
  AddBlog,
  DeleteBlog,
  getAllBlogs,
} from "../controllers/BlogsController.js";
import {
  AddNewAdmin,
  AddProfileImage,
  AddUser,
  AdminLogin,
  changeUserActiveStatus,
  DeleteAdminByOnlySuperAdmin,
  DeleteUser,
  EditAdminProfile,
  EditUser,
  GetAdminInfo,
  getAllAdmins,
  getAllUsers,
  LogoutAdmin,
  RemoveProfileImage,
  UpdateAdminProfile,
} from "../controllers/AdminContoller.js";
import { checkAdmin, checkSuperAdmin } from "../middleware/AdminMiddleware.js";
import { AddNews, getAllNews } from "../controllers/NewsController.js";
import multer from "multer";
const uploadProfileImage = multer({ dest: "uploads/profiles" });
const uploadBlogImage = multer({ dest: "uploads/blogs" });

const router = express.Router();

router.get("/get-adminInfo", checkAdmin, GetAdminInfo);
router.post("/login", AdminLogin);
router.post(
  "/add-profile-image",
  checkAdmin,
  uploadProfileImage.single("profile-image"),
  AddProfileImage
);

router.post("/update-profile", checkAdmin, UpdateAdminProfile);
router.get("/remove-profile-image", checkAdmin, RemoveProfileImage);
router.get("/logout", checkAdmin, LogoutAdmin);

router.get("/all-admins", checkAdmin, getAllAdmins);
router.post("/add-admin", checkSuperAdmin, AddNewAdmin);
router.post("/edit-admin", checkSuperAdmin, EditAdminProfile);
router.post("/delete-admin", checkSuperAdmin, DeleteAdminByOnlySuperAdmin);

router.get("/all-users", getAllUsers);
router.post("/add-user", AddUser);
router.post("/edit-user", checkAdmin, EditUser);
router.post("/change-user-status", checkAdmin, changeUserActiveStatus);
router.post("/delete-user", checkAdmin, DeleteUser);

router.get("/all-blogs", getAllBlogs);
router.post("/add-blog",checkAdmin,uploadBlogImage.single("blog-image"), AddBlog);
router.post("/delete-blog", checkAdmin, DeleteBlog);

router.get("/all-business-details", getAllBusinessDetails);
router.patch("/edit-business-details", EditBusinessDetails);

router.get("/all-financial-details", getAllFinancialDetails);
router.patch("/edit-financials", EditFinancialDetails);

router.get("/all-meetings", getAllMeetings);
router.post("/add-meeting", AddNewMeeting);

router.get("/all-news", getAllNews);
router.post("/add-news", AddNews);

export { router as AdminRouter };
