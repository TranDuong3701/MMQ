const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");

const userRouter = require("./routes/userRoutes");
const projectRouter = require("./routes/projectRoutes");
const segmentRouter = require("./routes/segmentRoutes");
const documentRouter = require("./routes/documentRoutes");
const viewRouter = require("./routes/viewRoutes");
const authRouter = require("./routes/authRoutes");
const globalErrorHanler = require("./controllers/errorController");
const AppError = require("./utils/appError");

const app = express();

app.enable("trust proxy");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// app.use(cors());
// app.use(helmet());
app.use(morgan("dev"));

// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this IP, please try again in an hour!",
// });
// app.use("/api", limiter);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// app.use(mongoSanitize());
// app.use(xss());
// app.use(hpp());
// app.use(compression());

app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);
app.use("/api/segments", segmentRouter);
app.use("/api/documents", documentRouter);
app.use("/api/auth", authRouter);
app.use("/", viewRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHanler);

module.exports = app;
