const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  
    // MongoDB duplicate key error (E11000)
    if (err.code === 11000) {
      // Extract the field and value causing the error
      const field = Object.keys(err.keyValue)[0];  // e.g., 'email' or 'username'
      const value = err.keyValue[field];  // The duplicate value, e.g., 'hassaan@gmail.com'
      
      err.statusCode = 400;
      err.message = `${field.charAt(0).toUpperCase() + field.slice(1)} '${value}' is already in use. Please enter another one.`;
    }
  
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  };
  
  module.exports = errorHandler;
  