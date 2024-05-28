const asyncHandler = endPoint => {
  return (req, res, next) => {
    endPoint(req, res, next).catch(next)
  }
}

const handleError = (err, req, res, next) => {
  res.json({
    status: err.status,
    message: err.message,
    code: err.code,
    stacktrace: err.stack
  })
}

module.exports = {
  asyncHandler,
  handleError
}