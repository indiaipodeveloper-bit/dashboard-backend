import bcrypt from "bcrypt";
import { Admins } from "../models/AdminSchema.js";
import { User } from "../models/UserModel.js";
import { setAdminAuthCookie } from "../services/AdminAuth.js";
import fs, { renameSync, unlinkSync } from "fs";
import mongoose from "mongoose";
const maxage = 3 * 24 * 60 * 60 * 1000;

// <----------------------------------------------- Get Requests ------------------------------------------------------>

// check if admin is  already Logged in
export async function GetAdminInfo(req, res) {
  try {
    const userdata = await Admins.findOne({ _id: req.user.id });
    if (!userdata) return res.send("user not found signup first ");
    return res.status(200).json({ userdata });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}

// list of admins so the every admin can see the no of admins
export async function getAllAdmins(req, res) {
  try {
    // const allAdmins = await Admins.find({ _id: { $ne: req.user.id } });
    const allAdmins = await Admins.find({});
    return res.status(200).json({ admins: allAdmins });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}

export async function getAllUsers(req, res) {
  try {
    const AllUsers = await User.find({});
    return res.status(200).json({ AllUsers });
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

    const veryfying = password == "1234";
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

// Logout for admin
export async function LogoutAdmin(req, res) {
  try {
    res
      .cookie("admincookie", "", { maxAge: 0, secure: true, sameSite: "None" })
      .send("Logged Out Successfully");
    return res.status(200).send("Logged Out Successfully");
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}

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

    return res
      .status(200)
      .json({ msg: "Admin Successfully Added", newAddedAdmin: admin });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}

export async function AddUser(req, res) {
  try {
    const { name, email, password, phone, gender, isActive } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User Already Exist");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      gender,
      isActive,
    });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}

export async function changeUserActiveStatus(req, res) {
  try {
    const { id } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).send("User Not Found");
    }
    user.isActive = !user.isActive;
    user.save();
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).send("sorry Internal Server Error");
  }
}

export async function AddProfileImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).send("File is required to Update Profile Image");
    }
    const date = Date.now();
    let fileName = "uploads/profiles/" + date + req.file.originalname;
    renameSync(req.file.path, fileName);

    const user = await Admins.findOneAndUpdate(
      { _id: req.user.id },
      { image: fileName },
      { new: true, runValidators: true }
    );
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}

export async function UpdateAdminProfile(req, res) {
  try {
    const {name} = req.body;
    if (!name) {
      return res.status(400).send("Name is Required to Update the Profile");
    }
    const user = await Admins.findOne(
      { _id: req.user.id },
      { name: name },
      {new: true, runValidators: true }
    );
    console.log(user);
    console.log("done");
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}

// <----------------------Removing Profile Image ------------------------------>

export async function RemoveProfileImage(req, res) {
  try {
    const user = await Admins.findOne({ email: req.user.email });
    if (!user) {
      return res.status(400).send("User Not Found");
    }

    if (user.image && fs.existsSync(user.image)) {
      try {
        fs.unlinkSync(user.image);
      } catch (fileError) {
        return res.status(400).send("error while removing the image")
      }
    }
    user.image = null;
    await user.save();
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server error inside remove image controller");
  }
}
