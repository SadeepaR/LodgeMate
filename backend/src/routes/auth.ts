import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";

const router = express.Router();

// POST /api/auth/login
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
  },
);

export default router;
