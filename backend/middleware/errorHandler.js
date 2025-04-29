const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      errors: Object.values(err.errors).map(e => e.message)
    });
  }

  // Default error
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error'
  });
};

module.exports = errorHandler;