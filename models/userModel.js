const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    avatar: String,
    role: {
      type: String,
      enum: ["PM", "T", "R"],
      default: "PM",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const roundOfSalts = 10;
  this.password = await bcrypt.hash(this.password, roundOfSalts);
  next();
});

userSchema.methods.comparePassword = async function (
  userPassword,
  hashPassword
) {
  return await bcrypt.compare(userPassword, hashPassword);
};

userSchema.methods.signToken = function (id) {
  const payload = { id };
  const privateKey = process.env.JWT_PRIVATE_KEY;
  const options = {
    expiresIn: process.env.JWT_EXPIRES_IN,
  };

  return jwt.sign(payload, privateKey, options);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
