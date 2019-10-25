const _ = require('lodash');

module.exports = class Domain {
  constructor(req) {
    this.req = req;
  }

  /**
   * 获取单个服务下所有绑定的域名列表
   * @link https://api.upyun.com/doc#/api/operation/domain/GET%20%2Fbuckets%2Fdomains
   * @param {String} bucket_name
   * @param {Number} page
   * @param {Number} limit
   * @return {Promise<Object<Array>>}
   */
  async list(bucket_name, page = 1, limit = 10) {
    return this.req.get('/buckets/domains', {
      params: {page, limit, bucket_name},
    }).then(function(response) {
      return response.data;
    });
  }

  /**
   * 给服务绑定新域名，需要系统审核之后才会生效，域名必须备案，才能审核通过
   * @link https://api.upyun.com/doc#/api/operation/domain/PUT%20%2Fbuckets%2Fdomains
   * @param {String} bucket_name
   * @param {String} domain
   * @param {String} callback 审核结果回调地址
   * @return {Promise<void>}
   */
  async add(bucket_name, domain, callback) {
    await this.req.put('/buckets/domains', {
      bucket_name,
      domain,
      callback,
      type,
    });
  }

  /**
   * 删除服务中已绑定的域名
   * @link https://api.upyun.com/doc#/api/operation/domain/DELETE%20%2Fbuckets%2Fdomains
   * @param {String} bucket_name
   * @param {String} domain
   * @return {Promise<void>}
   */
  async remove(bucket_name, domain) {
    await this.req.delete('/buckets/domains', {
      params: {bucket_name, domain},
    });
  }

  /**
   * 通过域名获取其绑定的服务名称
   * @link https://api.upyun.com/doc#/api/operation/domain/GET%20%2Fdomains%2Fbuckets
   * @param domain
   * @return {Promise<Object>}
   */
  async getBucketNameByDomain(domain) {
    return this.req.get('/domains/buckets', {
      params: {domain},
    }).then(response => {
      return response.data;
    });
  }

  /**
   * 获取域名绑定状态
   * NORMAL: 域名备案检查通过，可以正常使用
   * PENDING: 等待域名备案审核，无法正常使用
   * REFUSED: 域名检查未备案，无法正常使用
   * @param {String} domain
   * @return {Promise<String>}
   */
  async getDomainStatus(domain) {
    const bucket = await this.getBucketNameByDomain(domain);
    return _.get(bucket, 'data.domain_status');
  }
};
