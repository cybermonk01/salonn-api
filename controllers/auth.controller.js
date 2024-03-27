import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,

      password: hash,
    });

    await newUser.save();
    res.status(201).json({
      message: "User created sucessfully",
      newUser,
    });
  } catch (err) {
    console.log("err hai");
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    const err = new Error();
    err.status = 404;
    err.message = "User not registered";

    // if (!user) return res.status(404).send("User not registered");
    // if (!user) return next(err);

    if (!user) return next(createError(403, "User not registered!"));
    const isPasswordMatched = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    // if (!isPasswordMatched) return res.status(400).send("Invalid credentials");
    if (!isPasswordMatched)
      return next(createError(400, "Invalid credentials"));
    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;
    res.cookie("accessToken", token, { httpOnly: true }).status(200).json({
      success: true,
      message: "User login successful",
      info,
    });
  } catch (err) {
    res.status(500).send("Login error");
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logegd out");
};
