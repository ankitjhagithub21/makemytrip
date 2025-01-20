const User = require("../models/user");
const bcrypt = require("bcryptjs");
const validator = require('validator');
const generateToken = require("../utils/generateToken");

const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({success:false, message: "All fields are required." });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({message: "User already exist." });
    }

    if(fullName.trim().length<3){
        return res.status(400).json({message: "Full Name must be atleast 3 characters long." });   
    }

    //validate email

    if(!validator.isEmail(email)){
        return res.status(400).json({message: "Please enter valid email address." });   
    }
    //validate Password

    if(!validator.isStrongPassword(password)){
        return res.status(400).json({message: "Password must be 8 characters long with 1 upper case letter and 1 special character." }); 
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateToken(newUser);

    return res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3600000,
    }).status(201).json({ message:"Account created." });

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message:"Server error"  });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({message: "All fields are required." });
    }

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }

    const comparePassword = await bcrypt.compare(password, userExist.password);

    if (!comparePassword) {
      return res.status(400).json({ message: "Wrong email or password." });
    }

    const token = generateToken(userExist);

    return res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3600000,
    }).json({ message:`Welcome back ${userExist.fullName}`  });

  } catch (error) {
    res.status(500).json({ message:"Server error"  });
  }
};

const logout = (req, res) => {
  return res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 0,
  }).status(200).json({ success: true, message:`Logout successfull.`  });
 
};

const getUser = async(req, res) => {
  try {
    
    const user = await User.findById(req.user.id).select("-password");

    if(!user){
        return res.status(404).json({ success:false, message: "User not found." });
    }
    
    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ success: false, message:"Server error"  });
  }
};

module.exports = {
  signup,
  login,
  logout,
  getUser,
};