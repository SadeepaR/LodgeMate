import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// login API endpoint - POST /api/auth/login
router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6-30 characters is required").isLength({
      min: 6,
      max: 30,
    }),
  ],

  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const {email, password} = req.body;

    try{
      const user = await User.findOne({email}); // check weather there is a user with the entered email

      if(!user){
        return res.status(400).json({message: "Invalid credentials"}); // if no user is found, return an error
      }

      // compares the password entered by the user with the password stored in the database
      const isMatch = await bcrypt.compare(password, user.password); 
      // password = password entered by the user
      // user.password = password stored in the database

      if(!isMatch){
        return res.status(400).json({message: "Invalid credentials"}); // if passwords don't match, return an error
      }

      // so if username and pw match, then we create an access token and return as prt of http cookie
      // create a jwt token for the login user
      const token = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d"
        }
      )
      
      // store the JWT token in a cookie
      // send the cookie back to the frontend as a part of the response
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24,
      })

      return res.status(200).json({userId: user._id, "message": "Login successful"}); // send response message to frontend
    }catch(error){
      console.log(error)
      return res.status(500).json({message: "Internal server error"});
    }
  });

export default router;
