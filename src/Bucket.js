const _ = require('lodash');

module.exports = class Bucket {
  constructor(req) {
    this.req = req;
  }

  /**
   * 创建服务
   * @link https://api.upyun.com/doc#/api/operation/bucket/PUT%20%2Fbuckets
   * @param {String} bucket_name 服务名称
   * @param {String} type 服务类型
   * @param {String} business_type 业务类型, default is file
   * @param {Object} options
   * @param {Boolean} options.infrequent_access 是否为低频存储（仅云存储方式可用)
   * @return {Promise<Object>}
   */
  async create(bucket_name, type = 'file', business_type = 'file', options = {}) {
    if (options.infrequent_access && type !== 'file') {
      throw new Error('infrequent_access参数 仅在 type = file 时可用');
    }
    await this.req.put('/buckets', {
      type,
      bucket_name,
      business_type,
      infrequent_access: options.infrequent_access || false,
    });

    return this.get(bucket_name);
  }

  /**
   * 删除服务
   * @link https://api.upyun.com/doc#/api/operation/bucket/POST%20%2Fbuckets%2Fdelete
   * @param {String} bucket_name
   * @param {String} password
   * @param {Boolean} clean 是否是真删除，默认是假删除
   * @return {Promise<void>}
   */
  async remove(bucket_name, password, clean = false) {
    await this.req.post('/buckets/delete', {
      bucket_name,
      password,
      clean,
    });
  }

  /**
   * 获取服务列表
   * @link https://api.upyun.com/doc#/api/operation/bucket/GET%20%2Fbuckets
   * @param {*|Object} params
   * @param {String} params.since 点击上一页时，将值设置为上次请求接口返回的 since 值即可。没有则为空
   * @param {String} params.max 点击下一页时，将值设置为上次请求接口返回的 max 值即可。没有则为空
   * @param {number} params.limit 每次最大的请求条数，默认 25
   * @param {String} params.name 服务名, 当有 name 字段时只返回与 name 值完全匹配的服务，忽略其他的字段信息
   * @param {String} params.business_type 默认值为空，返回全部类型服务。file 返回文件类业务服务， live 返回直播业务类服务
   * @param {String} params.type 默认值为空，file 返回又拍云源类服务， ucdn 返回自主源站类服务，该参数仅当传入了 business_type 时，才生效
   * @param {Boolean} params.visible 外链是否开启
   * @return {Promise<Object>}
   */
  async list(params) {
    return this.req.get('/buckets', {params}).then(function(response) {
      return response.data;
    });
  }

  /**
   * 使用服务名获取一个服务
   * @return {Promise<Object>}
   */
  async get(bucket_name) {
    const data = await this.list({bucket_name});

    return _.head(data.buckets);
  }

  /**
   * 获取服务详情
   * @link https://api.upyun.com/doc#/api/operation/bucket/GET%20%2Fbuckets%2Finfo
   * @param {String} bucket_name
   * @return {Promise<Object>}
   */
  async info(bucket_name) {
    return this.req.get('/buckets/info', {
      params: {bucket_name},
    }).then(function(response) {
      return response.data;
    });
  }

  /**
   * 服务绑定操作员
   * @param {String} bucket_name
   * @param {String} operator_name
   * @return {Promise<void>}
   */
  async bindOperator(bucket_name, operator_name) {
    await this.req.put('/buckets/operators', {
      bucket_name,
      operator_name,
    });
  }

  /**
   * 服务解绑操作员
   * @link https://api.upyun.com/doc#/api/operation/bucket/DELETE%20%2Fbuckets%2Foperators
   * @param {String} bucket_name
   * @param {String} operator_name
   * @return {Promise<void>}
   */
  async unbindOperator(bucket_name, operator_name) {
    await this.req.delete('/buckets/operators', {
      params: {bucket_name, operator_name},
    });
  }

  /**
   * 获取某服务下的操作员列表
   * @link https://api.upyun.com/doc#/api/operation/bucket/GET%20%2Fbuckets%2Foperators
   * @param bucket_name
   * @return {Promise<Object<Array>>}
   */
  async listOperators(bucket_name) {
    return this.req.get('/buckets/operators', {
      params: {bucket_name},
    }).then(function(response) {
      return response.data;
    });
  }
};
