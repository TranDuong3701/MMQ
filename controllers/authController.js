const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("../utils/appError");
const User = require("../models/userModel.js");

module.exports = {
  register: catchAsync(async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.create({ username, password });

    const accessToken = user.signToken(user._id);

    res.cookie("jwt", accessToken, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });

    res.status(200).json({
      status: "success",
      data: {
        accessToken,
      },
    });
  }),
  login: catchAsync(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(new AppError("Please provide username and password!", 400));
    }

    const currentUser = await User.findOne({ username }).select("+password");
    if (!currentUser) return next(new AppError("User not found", 404));

    if (!(await currentUser.comparePassword(password, currentUser.password)))
      return next(new AppError("Password not match", 404));

    const accessToken = currentUser.signToken(currentUser._id);

    res.cookie("jwt", accessToken, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });

    res.status(200).json({
      status: "success",
      data: {
        accessToken,
      },
    });
  }),

  logout: (req, res, next) => {
    res.cookie("jwt", "loggedout", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({ status: "success" });
  },
  restrictTo: (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError("You do not have permission to perform this action", 403)
        );
      }

      next();
    };
  },
  protect: catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  }),

  // Only for rendered pages, no errors!
  isLoggedIn: async (req, res, next) => {
    if (req.cookies.jwt) {
      try {
        // 1) verify token
        const decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_PRIVATE_KEY
        );

        // 2) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) return next();

        res.locals.user = currentUser;
        return next();
      } catch (err) {
        return next();
      }
    }
    next();
  },
};
