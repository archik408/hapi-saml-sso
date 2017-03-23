'use strict';

const callback = require('./handlers/callback');
const login = require('./handlers/login');
const logout = require('./handlers/logout');
const metadata = require('./handlers/metadata');

/**
 * @description
 * Entry point from which you should import all controller methods
 */
module.exports = {
    callback: callback,
    login: login,
    logout: logout,
    metadata: metadata
};