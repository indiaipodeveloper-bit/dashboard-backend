import { User } from "../models/UserModel.js";
import { setUser } from "../services/userAuth.js";
import bcrypt from "bcrypt";
const maxAge = 3 * 24 * 60 * 60 * 1000;

export async function UserSignup(req, res) {
  try {
    const { name, email, phone, password, gender } = req.body;
    if (!email || !password || !name || !password || !gender) {
      return res.status(400).send("both email and password are required");
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.send("User already exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      gender,
    });

    const cookietoken = setUser(newUser);

    res.cookie("uid", cookietoken, { maxAge, secure: true, sameSite: "None" });
    return res.status(201).json({
      user: { id: newUser._id, email: newUser.email, tok: cookietoken },
    });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}

export async function UserLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("both email and password are required");
    }
    const user = await User.findOne({ email });
    if (!user || !user.isActive) {
      return res.status(400).send("No User Found SignUp First");
    }

    const veryfying = bcrypt.compare(password, user.password);
    if (!veryfying) {
      return res.status(400).send("Wrong Password");
    }
    const cookietoken = setUser(user);

    res.cookie("uid", cookietoken, { maxAge, secure: true, sameSite: "None" });
    return res.status(200).json({ userdata: user });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}

export async function LogoutUser(req, res) {
  try {
    res
      .cookie("uid", "loggedout", { maxAge, secure: true, sameSite: "None" })
      .json({ msg: "success" });
    return res.status(200).send("Logged Out Successfully");
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}

export async function UpdateUserProfile(req, res) {
  const { name, password, gender } = req.body;

  const updateFields = {};
  if (name) updateFields.name = name;
  if (password) updateFields.password = password;
  if (gender) updateFields.gender = gender;
  try {
    const userdata = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    return res.status(200).json({ userdata: userdata });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
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

    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { image: fileName },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      image: user.image,
    });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}

export async function DeleteAccount(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { isActive: false }
    );
    return res.status(200).send("Account Deleted");
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}
