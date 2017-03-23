'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();

// https://en.wikipedia.org/wiki/Identity_provider
// http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0-cd-02.html#5.1.Web%20Browser%20SSO%20Profile|outline

const plugins = [
    {
        register: require('../.'),
        options: {
            callbackUrl: 'https://your-app.com/callback',
            host: 'your-app.com',
            protocol: 'https',
            path: '/callback',
            signatureAlgorithm: 'sha1',
            entryPoint: 'https://your-saml-identity-provider',
            issuer: 'https://your-saml-service-provider',
            cert: 'yourCertificate',
            decryptionCert: 'test',
            decryptionPvk: true

        }
    }
];

// check for example Shibboleth
// https://wiki.shibboleth.net/confluence/display/SHIB2/NativeSPShibbolethXML

server.connection({ port: 8000 });

server.register(plugins, (err) => {

    if (err) {
        throw err;
    }
    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log(`Server running at: ${server.info.uri}`);
    });
});

