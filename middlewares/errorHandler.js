const errorHandler = (err, req, res, next) => {
  const errorCode = err.statusCode ?? 500;

  res.status(errorCode).json({
    error: err.message,
  });
};

module.exports = errorHandler;
