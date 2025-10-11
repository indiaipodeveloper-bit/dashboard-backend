import express from "express";
import { AddProfileImage, DeleteAccount, LogoutUser, UpdateUserProfile, UserLogin, UserSignup } from "../controllers/UserController.js";
import { CheckUserLoggedIn } from "../middleware/UserMiddleware.js";

export const router = express.Router()


router.post("/signup",UserSignup)
router.post("/login",UserLogin)
router.get("/logout",CheckUserLoggedIn,LogoutUser)
router.post("/update-profile",CheckUserLoggedIn,UpdateUserProfile)
router.post("/add-profile-picture",CheckUserLoggedIn,AddProfileImage)
router.delete("/delete-account",CheckUserLoggedIn,DeleteAccount)









export {router as UserRouter}
