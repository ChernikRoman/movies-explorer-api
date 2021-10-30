class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Forbidden error';
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
