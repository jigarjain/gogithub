'use strict';

import request from 'superagent';

function BaseApi() {} // eslint-disable-line no-empty-function

/**
 * @param  {String} url
 * @param  {Object} queryParams (Optional)
 * @return {Promise}             Resolves to object containing err & response
 */
BaseApi.get = (url, queryParams = {}) => {
    return new Promise((resolve, reject) => {
        request.get(url)
            .query(queryParams)
            .end((err, res) => {
                resolve({
                    err,
                    res
                });
            });
    });
};

export default BaseApi;
