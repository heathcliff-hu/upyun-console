const _ = require('lodash');

class ErrorHandler extends Error {
  constructor(error) {
    super(error.message);
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
