'use strict';

const Boom = require('boom');
const Joi = require('joi');

/**
 * @description
 * SAML logout
 */
module.exports = {
    auth: false,
    validate: {
        options: { stripUnknown: true },
        query: {
            nameIdFormat: Joi.string().required(),
            nameId: Joi.string().required()
        }
    },
    handler: (req, reply) => {
        const plugin = req.server.plugins['hapi-saml-sso'];
        const saml = plugin && plugin['saml-instance'];
        if (saml) {
            const options = {
                user: {
                    nameIDFormat: req.query.nameIdFormat,
                    nameID: req.query.nameId
                }
            };
            saml.getLogoutUrl(options, (err, logoutUrl) => {
                if (err) {
                    return reply(Boom.wrap(err, 500));
                }
                reply.redirect(logoutUrl);
            });
        }
        else {
            reply(Boom.badImplementation('SAML instance not exist'));
        }
    },
    tags: ['api', 'saml'],
    description: 'SAML service provider logout',
    notes: 'SAML service provider logout'
};
