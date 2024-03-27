import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return res.status(403).send("You can delete only uour account");
  }

  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "user deleted",
  });
};

export const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(400).send("No users found");
    }

    const { password, ...info } = users;
    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    res.status(500).send("All users error");
  }
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};
