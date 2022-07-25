const User = require("./../models/userModel");
const catchAsync = require("../utils/catchAsync");

module.exports = {
  getAllUsers: catchAsync(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      data: users,
    });
  }),
  getUser: catchAsync(async () => {}),
  createUser: catchAsync(async () => {}),
  updateUser: catchAsync(async () => {}),
  deleteUser: catchAsync(async (req, res, next) => {
    await User.deleteMany();

    res.status(204).json({
      status: "success",
      data: null,
    });
  }),
};
