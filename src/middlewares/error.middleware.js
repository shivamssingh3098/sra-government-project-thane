// // error.middleware.js

// import { ApiError } from "../utils/ApiError.js";
// const globalErrorHandler = (err, req, res, next) => {
//   // If error is an instance of ApiError (your custom error)
//   if (err instanceof ApiError) {
//     return res.status(err.statusCode).json({
//       success: err.success,
//       message: err.message,
//       errors: err.errors,
//       stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
//     });
//   }

//   // If error is some other unknown error (like system error)
//   return res.status(500).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//     errors: [],
//     stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
//   });
// };

// export { globalErrorHandler };
const globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message =
    err.message?.replace(/^Error:\s*/, "") || "Internal Server Error";
  let errors = err || [];

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    errors,

    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export { globalErrorHandler };
