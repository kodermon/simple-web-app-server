const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// Register User
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, job } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ msg: "User already exists" });
  }

  const user = await User.create(req.body);
  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      job: user.job,
      picture: user.picture,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ msg: "Error occurred" });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.comparePassword(password))) {
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      job: user.job,
      email: user.email,
      picture: user.picture,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ msg: "Invalid email or password" });
  }
};

// get profile
const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.job = req.body.job || user.job;
    user.picture = req.body.picture || user.picture;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      job: updatedUser.job,
      picture: updatedUser.picture,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404).json({ msg: "user not found" });
  }
};

// delete profile
const deleteProfile = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.status(200).json({ msg: "User deleted" });
  } else {
    res.status(404).json({ msg: "User not found" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  deleteProfile,
};

// ALTERNATIVE LOGIN FUNCTIONALITY

// if (!email || !password) {
//   res.status(401).json({ msg: "Please provide email and password" });
// }

// const user = await User.findOne({ email });
// if (!user) {
//   res.status(401).json({ msg: "Invalid email" });
// }

// // compare password
// const isPasswordCorrect = await user.comparePassword(password);
// if (!isPasswordCorrect) {
//   res.status(401).json({ msg: "Invalid password" });
// }

// res.status(200).json({
//   _id: user._id,
//   firstName: user.firstName,
//   email: user.email,
//   token: generateToken(),
// });
