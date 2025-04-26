class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message); // this already sets `this.message`
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };

// class ApiError extends Error {
//   constructor(
//     statusCode,
//     message = "Something went wrong",
//     errors = [],
//     stack = ""
//   ) {
//     super(message); // this sets this.message automatically
//     this.statusCode = statusCode;
//     this.data = null;
//     this.success = false;
//     this.errors = errors;

//     if (stack) {
//       this.stack = stack;
//     } else {
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }
// }

// export { ApiError };

// class ApiError extends Error {
//   constructor(
//     statusCode,
//     message = "Something went wrong",
//     errors = [],
//     stack = ""
//   ) {
//     super(message);
//     this.statusCode = statusCode;
//     this.data = null;
//     this.message = message;
//     this.success = false;
//     this.errors = errors;
//     if (stack) {
//       this.stack = stack;
//     } else {
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }
// }
// export { ApiError };
