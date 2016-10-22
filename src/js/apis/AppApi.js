'use strict';

import BaseApi from './BaseApi';
import cfg from '../../config';


function AppApi() {} // eslint-disable-line no-empty-function

/**
 * Gets gh-repos for the given username
 *
 * @param  {String} username
 * @return {Promise}
 */
AppApi.getReposOfUser = function (username) {
    const url = `${cfg.endpoints.ghApiBase}/users/${username}/repos`;

    return BaseApi.get(url);
};

export default AppApi;
