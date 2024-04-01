import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const login = (req, res) => {
  res.send("login route");
};

// Signup users
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      res.status(400).json({ error: "Password didn't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      res.send(400).json({ error: "User already exists" });
    }

    // Hash password here
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if(newUser){
      // Generate JWT token here 
      
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    }else {
      res.status(400).json({error:"Invalid user data"})
    }
   
  } catch (error) {
    console.log("Error from signUp controller", error.message);
    res.status(500).json("Internal server error");
  }
};

export const logout = (req, res) => {
  res.send("logout route");
};
