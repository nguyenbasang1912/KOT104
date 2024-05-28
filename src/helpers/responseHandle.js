class SuccessResponse {
  constructor({ status = true, message, data }) {
    this.status = status
    this.message = message
    this.data = data
  }

  json(res) {
    res.json({
      status: this.status,
      message: this.message,
      data: this.data
    })
  }
}

class ErrorResponse extends Error {
  constructor({ status = false, message = '', code = 500 }) {
    super(message)
    this.status = status
    this.code = code
  }
}

module.exports = {
  SuccessResponse,
  ErrorResponse
}