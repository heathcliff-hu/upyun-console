const Bucket = require('./Bucket');
const Domain = require('./Domain');
const Operator = require('./Operator');
const createReq = require('./create-req');

module.exports = class Client {
  constructor(token) {
    if (!token) {
      throw new Error('必须初始化 token 参数');
    }
    Object.defineProperties(this, {
      endpoint: {
        value: 'https://api.upyun.com',
        writable: false,
      },
      token: {
        value: token,
        writable: false,
      },
    });

    this.req = createReq(this.endpoint, this.token);

    this.domain = new Domain(this.req);
    this.bucket = new Bucket(this.req);
    this.operator = new Operator(this.req);
  }
};
