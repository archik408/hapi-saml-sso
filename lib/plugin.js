'use strict';

const controller = require('./controller');
const Saml = require('./saml/factory');

exports.register = (server, options, next) => {

    const singleton = Saml.create(options);
    server.expose('saml-instance', singleton);

    server.route({ method: 'GET', path: '/saml/metadata', config: controller.metadata });
    server.route({ method: 'GET', path: '/saml/login', config: controller.login });
    server.route({ method: 'GET', path: '/saml/logout', config: controller.logout });
    server.route({ method: 'POST', path: '/saml/callback', config: controller.callback });

    next();
};

exports.register.attributes = {
    pkg: require('../package.json')
};
