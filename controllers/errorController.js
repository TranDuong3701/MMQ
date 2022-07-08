module.exports = (err, req, res, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "something went very wrong";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
