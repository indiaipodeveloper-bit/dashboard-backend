import express from "express";
import { AddNewMeeting, getAllMeetings } from "../controllers/MeetingsController.js";
import { EditFinancialDetails, getAllFinancialDetails } from "../controllers/FinancialController.js";
import { EditBusinessDetails, getAllBusinessDetails } from "../controllers/BusinessController.js";
import { AddBlog, getAllBlogs } from "../controllers/BlogsController.js";
import {AddNewAdmin, AdminLogin, GetAdminInfo, getAllAdmins, getAllUsers} from '../controllers/AdminContoller.js'
import { checkAdmin, checkSuperAdmin } from "../middleware/AdminMiddleware.js";
import { AddNews, getAllNews } from "../controllers/NewsController.js";

const router = express.Router();

router.get("/get-adminInfo", checkAdmin, GetAdminInfo);
router.post("/login", AdminLogin);


router.get("/all-admins", checkAdmin, getAllAdmins);
router.post("/add-admin", checkSuperAdmin, AddNewAdmin);
// router.delete("/delete-admin")


router.get("/all-users", checkAdmin, getAllUsers);
router.post("/add-user", checkAdmin, getAllUsers);




router.get("/all-blogs", getAllBlogs);
router.post("/add-blog", AddBlog);


router.get("/all-business-details", checkAdmin, getAllBusinessDetails);
router.patch("/edit-business-details", checkAdmin, EditBusinessDetails);



router.get("/all-financials", checkAdmin, getAllFinancialDetails);
router.patch("/edit-financials", checkAdmin, EditFinancialDetails);





router.get("/all-meetings", checkAdmin, getAllMeetings);
router.post("/add-meeting", checkAdmin, AddNewMeeting);


router.get("/all-news", checkAdmin, getAllNews);
router.post("/add-news", checkAdmin,AddNews);



export { router as AdminRouter };
