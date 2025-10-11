import bcrypt from "bcrypt";
import { Admins } from "../models/AdminSchema.js";
import { User } from "../models/UserModel.js";
import {setAdminAuthCookie } from "../services/AdminAuth.js";
const maxage = 3 * 24 * 60 * 60 * 1000;
// <----------------------------------------------- Get Requests ------------------------------------------------------>

// check if admin is  already Logged in
export async function GetAdminInfo(req, res) {
  try {
    const userdata = await Admins.findOne({ _id: req.user.id });
    if (!userdata) return res.send("user not found signup first ");
    return res.status(200).json({
      id: userdata.id,
      name: userdata.name,
      email: userdata.email,
      adminRole: userdata.adminRole,
    });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}

// list of admins so the every admin can see the no of admins
export async function getAllAdmins(req, res) {
  try {
    const allAdmins = await Admins.find({email:{$ne:req.admin.email}});
    return res.status(200).json({ admins: allAdmins });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}







export  async function getAllUsers(req, res) {
  try {
    const allBlogs = await User.find({});
    return res.status(200).json({ allBlogs });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}

// <----------------------------------------------- Post Requests ------------------------------------------------------>

// admin login
export async function AdminLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("both email and password are required");
    }
    const admin = await Admins.findOne({ email });
    if (!admin) {
      return res.status(400).send("No Admin Found");
    }

    const veryfying = password == "1234"
    if (!veryfying) {
      return res.status(400).send("Wrong Password");
    }
    const cookietoken = setAdminAuthCookie(admin);
    res.cookie("admincookie", cookietoken, {
      maxage,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({ userdata: admin });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}

// Add a new admin only by Super Admin
export async function AddNewAdmin(req, res) {
  const { name, email, adminRole, password } = req.body;
  try {
    const existingAdmin = await Admins.findOne({ email });
    if (existingAdmin) {
      return res.status(400).send("Admin Already Exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const admin = await Admins.create({
      name,
      email,
      adminRole,
      password: hashedPassword,
    });

    return res.status(200).json({ msg: "Admins Added", newAddedAdmin: admin });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}


export async function AddUser(req, res) {
  try {
    const { name, email, password, phone, gender,isActive } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User Already Exist");
    }
    const user = await User.create({
      name,email,password,phone,gender,isActive
    });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}
