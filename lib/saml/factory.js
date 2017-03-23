'use strict';

const Saml = require('passport-saml/lib/passport-saml/saml');

class SamlFactory {
    /**
     * Create passport-saml instance
     * 
     * @param options
     * @returns {SAML}
     */
    static create(options = {}) {
        const instance = new Saml.SAML(options);
        instance.decryptionCert = options.decryptionCert;
        return instance;
    }
}

module.exports = SamlFactory;
