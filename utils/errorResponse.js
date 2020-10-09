class ErrorResponse extends Error {
  constructor(message, statusCode, type, name) {
    super(message);
    this.statusCode = statusCode;
    this.type = type;
    this.name = name;
  }
}

module.exports = ErrorResponse;