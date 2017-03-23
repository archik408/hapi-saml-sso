'use strict';

const Boom = require('boom');

/**
 * @description
 * SAML login
 */
module.exports = {
    auth: false,
    handler: (req, reply) => {
        const plugin = req.server.plugins['hapi-saml-sso'];
        const saml = plugin && plugin['saml-instance'];
        if (saml) {
            saml.getAuthorizeUrl(
                {
                    headers: req.headers,
                    body: req.payload,
                    query: req.query
                },
                (err, loginUrl) => {
                    if (err) {
                        return reply(Boom.wrap(err, 500));
                    }
                    reply.redirect(loginUrl);
                });
        }
        else {
            reply(Boom.badImplementation('SAML instance not exist'));
        }
    },
    tags: ['api', 'saml'],
    description: 'SAML service provider login',
    notes: 'SAML service provider login'
};
