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
import { AddBlog, getAllBlogs } from "../controllers/BlogsController.js";
import {
  AddNewAdmin,
  AddProfileImage,
  AddUser,
  AdminLogin,
  changeUserActiveStatus,
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
const upload = multer({ dest: "uploads/profiles" });

const router = express.Router();

router.get("/get-adminInfo", GetAdminInfo);
router.post("/login", AdminLogin);
router.post(
  "/add-profile-image",
  checkAdmin,
  upload.single("profile-image"),
  AddProfileImage
);
router.post('/update-profile',UpdateAdminProfile)
router.get("/remove-profile-image", RemoveProfileImage);
router.get("/logout", LogoutAdmin);

router.get("/all-admins", getAllAdmins);
router.post("/add-admin", checkSuperAdmin, AddNewAdmin);
// router.delete("/delete-admin")

router.get("/all-users", getAllUsers);
router.post("/add-user", AddUser);
router.post("/change-user-status", changeUserActiveStatus);

router.get("/all-blogs", getAllBlogs);
router.post("/add-blog", AddBlog);

router.get("/all-business-details", getAllBusinessDetails);
router.patch("/edit-business-details", EditBusinessDetails);

router.get("/all-financial-details", getAllFinancialDetails);
router.patch("/edit-financials", EditFinancialDetails);

router.get("/all-meetings", getAllMeetings);
router.post("/add-meeting", AddNewMeeting);

router.get("/all-news", getAllNews);
router.post("/add-news", AddNews);












// router.get("/get-adminInfo", checkAdmin, GetAdminInfo);
// router.post("/login", AdminLogin);
// router.post(
//   "/add-profile-image",
//   checkAdmin,
//   upload.single("profile-image"),
//   AddProfileImage
// );
// router.post('/update-profile',checkAdmin,UpdateAdminProfile)
// router.get("/remove-profile-image", checkAdmin, RemoveProfileImage);
// router.get("/logout", checkAdmin, LogoutAdmin);

// router.get("/all-admins", checkAdmin, getAllAdmins);
// router.post("/add-admin", checkSuperAdmin, AddNewAdmin);
// // router.delete("/delete-admin")

// router.get("/all-users", checkAdmin, getAllUsers);
// router.post("/add-user", checkAdmin, AddUser);
// router.post("/change-user-status", checkAdmin, changeUserActiveStatus);

// router.get("/all-blogs", checkAdmin, getAllBlogs);
// router.post("/add-blog", checkAdmin, AddBlog);

// router.get("/all-business-details", checkAdmin, getAllBusinessDetails);
// router.patch("/edit-business-details", checkAdmin, EditBusinessDetails);

// router.get("/all-financial-details", checkAdmin, getAllFinancialDetails);
// router.patch("/edit-financials", checkAdmin, EditFinancialDetails);

// router.get("/all-meetings", checkAdmin, getAllMeetings);
// router.post("/add-meeting", checkAdmin, AddNewMeeting);

// router.get("/all-news", checkAdmin, getAllNews);
// router.post("/add-news", checkAdmin, AddNews);













export { router as AdminRouter };
