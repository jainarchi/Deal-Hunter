import { use } from "react";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";


/*
    Register user
*/
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await userModel.create({
      username,
      email,
      password,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      err: "Registeration failed",
    });
  }
};


/*
    Login user
*/

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
      err: "User not found",
    });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
      err: "Invalid credentials",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
  });

  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user,
  });
};



/*
    get-me user
*/

const getMe = async (req , res) =>{
   
    const user = await userModel.findById(req.user.id)

    if(!user){
        return res.status(400).json({
            success : false ,
            message : 'User not found' ,
            err : 'User not found'
        })
    }

    return res.status(200).json({
        success : true ,
        message : 'User fetched successfully' ,
        user
    })

}




export default {
    register,
    login,
    getMe
}