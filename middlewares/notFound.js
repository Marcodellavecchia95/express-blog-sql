const notFound = (req, res, next) => {
  const errorCode = 404;

  res.status(errorCode).json({
    error: "Not Found",
  });
};

module.exports = notFound;
