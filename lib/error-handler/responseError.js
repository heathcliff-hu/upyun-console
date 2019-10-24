const _ = require('lodash');
const BaseError = require('./baseError');

module.exports = class ResponseError extends BaseError {
  constructor(error) {
    super(error.message);
    this.name = 'UPYUN RESPONSE ERROR';
    const response = _.get(error, 'response.data');
    this.name = 'UPYUN ERROR';
    this.type = response.type;
    this.message = response.message;
    this.code = response.error_code;
    this.request_uri = response.request;
  };
};
