class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Bad request error';
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
