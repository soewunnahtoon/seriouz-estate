import bcrypt from "bcrypt";

import { User } from "../models/userModel.js";
import { List } from "../models/listModel.js";

const updateUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(401).json({
        success: false,
        mesage: "You can only Update on Your Own Account.",
      });
    }

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...other } = updatedUser._doc;

    return res.status(200).json(other);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(401).json({
        success: false,
        mesage: "You can only Delete on Your Own Account.",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    return res
      .clearCookie("access_token")
      .status(200)
      .json("User has been Deleted!");
  } catch (error) {
    next(error);
  }
};

const getUserList = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const lists = await List.find({ userRef: req.params.id });

      return res.status(200).json(lists);
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(401).json({
      success: false,
      mesage: "You can only View on Your Own List.",
    });
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found." });
    }

    const { password: pass, ...other } = user._doc;

    return res.status(200).json(other);
  } catch (error) {
    next(error);
  }
};

export { updateUser, deleteUser, getUserList, getUser };
