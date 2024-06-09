const asyncHandler = endPoint => {
  return (req, res, next) => {
    endPoint(req, res, next).catch(next)
  }
}

const handleError = (err, req, res, next) => {
  res.status(err.code || 500).json({
    status: err.status || false,
    message: err.message,
    stacktrace: err.stack
  })
}

module.exports = {
  asyncHandler,
  handleError
}