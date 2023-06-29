const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  validationRegister,
  User,
  validateLoginUser,
} = require("../models/User");

// @desc    Register A new user
// @path    /api/auth/register
// @method  POST
// @access public
const registerUser = async (req, res) => {
  try {
    // validation
    const { error } = validationRegister(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // check if the user already exist
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ message: "This email is already registered" });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // making new user
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
      profilePhoto: {
        url: "../images/avatar-03.png",
      },
    });

    // save the user in DB
    await newUser.save();

    res.status(201).json({ message: "User Registered Successfully!" });
  } catch (error) {
    console.log(error);
  }
};

// @desc    Login User
// @path    /api/auth/login
// @method  POST
// @access  public

const loginUser = async (req, res) => {
  // validate user
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    // check email is exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const isPasswordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = user.generateToken();

    res.status(200).json({
      _id: user._id,
      isAdmin: user.isAdmin,
      profilePhoto: user.profilePhoto,
      token,
      username: user.userName,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
