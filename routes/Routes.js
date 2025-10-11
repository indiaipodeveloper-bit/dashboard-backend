import express from "express";
import { AddNewMeeting, getAllMeetings } from "../controllers/MeetingsController.js";
import { EditFinancialDetails, getAllFinancialDetails } from "../controllers/FinancialController.js";
import { EditBusinessDetails, getAllBusinessDetails } from "../controllers/BusinessController.js";
import { AddBlog, getAllBlogs } from "../controllers/BlogsController.js";
import {AddNewAdmin, AddUser, AdminLogin, GetAdminInfo, getAllAdmins, getAllUsers} from '../controllers/AdminContoller.js'
import { checkAdmin, checkSuperAdmin } from "../middleware/AdminMiddleware.js";
import { AddNews, getAllNews } from "../controllers/NewsController.js";

const router = express.Router();

router.get("/get-adminInfo" , GetAdminInfo);
router.post("/login", AdminLogin);


router.get("/all-admins" , getAllAdmins);
router.post("/add-admin", AddNewAdmin);
// router.delete("/delete-admin")


router.get("/all-users" , getAllUsers);
router.post("/add-user" , AddUser);




router.get("/all-blogs", getAllBlogs);
router.post("/add-blog", AddBlog);


router.get("/all-business-details" , getAllBusinessDetails);
router.patch("/edit-business-details" , EditBusinessDetails);



router.get("/all-financials" , getAllFinancialDetails);
router.patch("/edit-financials" , EditFinancialDetails);





router.get("/all-meetings" , getAllMeetings);
router.post("/add-meeting" , AddNewMeeting);


router.get("/all-news" , getAllNews);
router.post("/add-news" ,AddNews);



export { router as AdminRouter };
