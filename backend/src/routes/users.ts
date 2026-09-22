import { Request, Response } from "express";
import express from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

// POST /api/users/register
router.post(
  "/register",
  [
    check("firstName", "First name is required").isString(),
    check("lastName", "Last name is required").isString(),
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

    try {
      let user = await User.findOne({ email: req.body.email }); // checking if user already exists

      // if user already exists, return an error
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      // if user doesn't exist, create a new user
      user = new User(req.body);

      // save the new user to the database
      await user.save();

      // create a JWT token for the new user
      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        },
      );

      // store the JWT token in a cookie
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24,
      });

      return res.sendStatus(200); // return 200 if everything is successful
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
);

export default router;
