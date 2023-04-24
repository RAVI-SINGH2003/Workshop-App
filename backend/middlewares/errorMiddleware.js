export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  console.log("error",err)
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
