module.exports = class Operator {
  constructor(req) {
    console.warn('WARNING!!!: 操作员接口 upyun 并未开放，请谨慎使用');
    this.req = req;
  }

  /**
   * 创建操作员
   * @param {String} operator_name
   * @param {String} realname
   * @param {String} password
   * @param {Undefined|Object} operator_auth
   * @return {Promise<Object>}
   */
  async create(operator_name, realname, password, operator_auth) {
    await this.req.put('/operators', {
      operator_name,
      realname,
      password,
      operator_auth,
    });

    return this.info(operator_name);
  }

  /**
   * 获取单一操作员信息
   * @param {String} operator_name
   * @return {Promise<Object>}
   */
  async info(operator_name) {
    return this.req.get('/operators/info', {
      params: {operator_name},
    }).then(function(response) {
      return response.data;
    });
  }

  /**
   * 更新操作员
   * @param {String} operator_name
   * @param {Object} options
   * @param {String} options.realname
   * @param {String} options.password
   * @param {Undefined|Object} options.operator_auth
   * @return {Promise<Object>}
   */
  async update(operator_name, options = {}) {
    await this.req.post('/operators', {
      operator_name,
      ...options,
    });
    return this.info(operator_name);
  }

  /**
   * 获取操作员列表
   * @return {Promise<any>}
   */
  async list() {
    return this.req.get('/operators').then(function(response) {
      return response.data;
    });
  }

  /**
   * 删除操作员
   * @param {String} operator_name
   * @return {Promise<void>}
   */
  async remove(operator_name) {
    await this.req.delete('/operators', {
      params: {operator_name},
    });
  }
};
