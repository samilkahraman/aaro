const axios = require('axios');
const Url = require('url-parse');

/**
 * Creates a Aaro instance.
 *
 * @param {Object} options Configuration options
 * @param {String} options.baseUrl The url of the erp source (erp.aaro.com.tr)
 * @param {String} options.username The API user that allowed to use api
 * @param {String} options.password The private app password
 * @param {String} options.accessToken The 12 hour accessible Bearer token
 * @param {String} [options.apiVersion] The Aaro API version to use
 * @param {Boolean} [options.presentmentPrices] Whether to include the header to
 *     pull presentment prices for products
 * @param {Boolean|Object} [options.autoLimit] Limits the request rate
 * @param {Number} [options.timeout] The request timeout
 * @constructor
 * @public
 */
function Aaro(options) {
    if (!(this instanceof Aaro)) return new Aaro(options);
    if (!options || !options.baseUrl || !options.accessToken) {
        throw new Error('Missing or invalid options');
    }
    this._setDefaultsOptions(options);

    this.baseUrl = options.baseUrl;
}

/**
 * GET requests
 *
 * @param  {String} endpoint
 * @param  {Object} params
 *
 * @return {Object}
 */
Aaro.prototype.get = function get(endpoint, params = {}) {
    return this.request('get', endpoint, null, params);
};

/**
 * POST requests
 *
 * @param  {String} endpoint
 * @param  {Object} data
 * @param  {Object} params
 *
 * @return {Object}
 */
Aaro.prototype.post = function post(endpoint, data, params = {}) {
    return this.request('post', endpoint, data, params);
};

/**
 * PUT requests
 *
 * @param  {String} endpoint
 * @param  {Object} data
 * @param  {Object} params
 *
 * @return {Object}
 */
Aaro.prototype.put = function put(endpoint, data, params = {}) {
    return this.request('post', endpoint + '/post', data, {
        ...params,
        KayitTipi: 2,
    });
};

/**
 * DELETE requests
 *
 * @param  {String} endpoint
 * @param  {Object} params
 * @param  {Object} params
 *
 * @return {Object}
 */
Aaro.prototype.delete = function remove(endpoint, params = {}) {
    return this.request('post', endpoint + '/post', null, {
        ...params,
        KayitTipi: -1,
    });
};

/**
 * Set default options
 *
 * @param {Object} opt
 */
Aaro.prototype._setDefaultsOptions = function _setDefaultsOptions(opt) {
    this.baseUrl = opt.baseUrl;
    this.isHttps = /^https/i.test(this.baseUrl);
    this.encoding = opt.encoding || 'utf8';
    this.grant_type = opt.grant_type || 'password';
    this.accessToken = opt.accessToken || '';
    this.username = opt.username || '';
    this.password = opt.password || '';
    this.queryStringAuth = opt.queryStringAuth || false;
    this.timeout = opt.timeout || 60000;
    this.axiosConfig = opt.axiosConfig || {};
};

Aaro.prototype._getUrl = function _getUrl(endpoint, params) {
    let url =
        this.baseUrl.slice(-1) === '/' ? this.baseUrl : this.baseUrl + '/';
    url = url + 'api/' + endpoint;

    return this._normalizeQueryString(url, params);
};

Aaro.prototype._normalizeQueryString = function _normalizeQueryString(
    url,
    params
) {
    // Exit if don't find query string.
    if (url.indexOf('?') === -1 && Object.keys(params).length === 0) {
        return url;
    }

    const query = new Url(url, null, true).query;
    const values = [];

    let queryString = '';

    // Include params object into URL.searchParams.
    this._parseParamsObject(params, query);

    for (const key in query) {
        values.push(key);
    }
    values.sort();

    for (const i in values) {
        if (queryString.length) {
            queryString += '&';
        }

        queryString += encodeURIComponent(values[i])
            .replace(/%5B/g, '[')
            .replace(/%5D/g, ']');
        queryString += '=';
        queryString += encodeURIComponent(query[values[i]]);
    }

    return url.split('?')[0] + '?' + queryString;
};

Aaro.prototype.request = function request(method, endpoint, data, params = {}) {
    const url = this._getUrl(endpoint, params);
    const headers = {
        Authorization: `Bearer ${this.accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    // only set "User-Agent" in node environment
    // the checking method is identical to upstream axios
    if (
        typeof process !== 'undefined' &&
        Object.prototype.toString.call(process) === '[object process]'
    ) {
        headers['User-Agent'] = 'Aaro REST API - JS Client';
    }

    let options = {
        url: url,
        method: method,
        responseEncoding: this.encoding,
        timeout: this.timeout,
        responseType: 'json',
        headers,
    };

    if (data) {
        options.headers['Content-Type'] = 'application/json;charset=utf-8';
        options.data = JSON.stringify(data);
    }

    // Allow set and override Axios options.
    options = { ...options, ...this.axiosConfig };
    return axios(options);
};

/**
 * Parse params object.
 *
 * @param {Object} params
 * @param {Object} query
 */
Aaro.prototype._parseParamsObject = function _parseParamsObject(params, query) {
    for (const key in params) {
        const value = params[key];

        if (typeof value === 'object') {
            for (const prop in value) {
                const itemKey = key.toString() + '[' + prop.toString() + ']';
                query[itemKey] = value[prop];
            }
        } else {
            query[key] = value;
        }
    }

    return query;
};

module.exports = Aaro;
