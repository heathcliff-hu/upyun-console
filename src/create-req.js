const _ = require('lodash');
const axios = require('axios');

const RequestError = require('../lib/error-handler/requestError');
const ResponseError = require('../lib/error-handler/responseError');

/**
 * @param endpoint
 * @param token
 * @return {AxiosInstance}
 */
module.exports = function(endpoint, token) {
  const req = axios.create({
    baseURL: endpoint,
    timeout: 15000,
    headers: {
      authorization: `bearer ${token}`,
    },
  });

  req.interceptors.request.use((config) => {
    config.url = encodeURI(decodeURIComponent(config.url));
    return config;
  }, error => {
    throw new RequestError(error);
  });

  req.interceptors.response.use((response) => {
    return response;
  }, error => {
    const response = _.get(error, 'response');
    if (_.isUndefined(response)) {
      throw error;
    }

    if (response.status === 404) {
      return response;
    }

    // @link https://api.upyun.com/doc#/api/guide/errorCode
    throw new ResponseError(error);
  });

  return req;
};
