const BaseError = require('./baseError');

module.exports = class RequestError extends BaseError {
  constructor(error) {
    super(error.message);
    this.name = 'UPYUN REQUEST ERROR';
  };
};
