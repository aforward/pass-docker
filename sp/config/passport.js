const SamlStrategy = require("passport-saml").Strategy;

module.exports = function(passport, config) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  // Attributes sent from the pass-docker idp (these may OR may not be the same
  // attributes sent by the actual JHU idp):
  ///  attributes: {

  //   'urn:oid:0.9.2342.19200300.100.1.1': 'nih-user',

  //   'urn:oid:0.9.2342.19200300.100.1.3': 'nihuser@jhu.edu',

  //   'urn:oid:1.3.6.1.4.1.5923.1.1.1.9': 'FACULTY@johnshopkins.edu',

  //   'urn:oid:1.3.6.1.4.1.5923.1.1.1.1': 'FACULTY',

  //   'urn:oid:2.5.4.4': 'Ser',

  //   'urn:oid:2.16.840.1.113730.3.1.241': 'Nihu Ser',

  //   'urn:oid:2.5.4.42': 'Nihu',

  //   'urn:oid:1.3.6.1.4.1.5923.1.1.1.6': 'nih-user@johnshopkins.edu',

  //   'urn:oid:1.3.6.1.4.1.5923.1.1.1.13': 'KYWJIT@johnshopkins.edu',

  //   'urn:oid:2.16.840.1.113730.3.1.3': '00001421'

  // },

  //map of possible profile attributes and what name
  //we should give them on the resulting user object
  //add to this with other attrs if you request them
  const profileAttrs = {
    'urn:oid:2.16.840.1.113730.3.1.241': 'displayName',
    'urn:oid:1.3.6.1.4.1.5923.1.1.1.9': 'scopedAffiliation',
    'urn:oid:0.9.2342.19200300.100.1.3': 'email',
    'urn:oid:2.16.840.1.113730.3.1.3': 'employeeNumber',
    'urn:oid:1.3.6.1.4.1.5923.1.1.1.1': 'employeeIdType',
    'urn:oid:1.3.6.1.4.1.5923.1.1.1.6': 'eppn',
    'urn:oid:2.5.4.42': 'givenName',
    'urn:oid:2.5.4.4': 'surname',
    'urn:oid:1.3.6.1.4.1.5923.1.1.1.13': 'uniqueId',
    'urn:oid:0.9.2342.19200300.100.1.1': 'uniqueIdType',
  };

  function convertProfileToUser(profile) {
    let user = {};
    let niceName;
    let idx;
    let keys = Object.keys(profile);
    let key;

    for (idx = 0; idx < keys.length; ++idx) {
        key = keys[idx];
        niceName = profileAttrs[key];
        if (niceName) {
            user[niceName] = profile[key];
        }
    }

    user.jhedIdType = 'eppn';

    return user;
  }

  const strategy = new SamlStrategy(
    {
      callbackUrl: config.passport.saml.callbackUrl,
      path: config.passport.saml.path,
      protocol: "https://",
      entryPoint: config.passport.saml.entryPoint,
      issuer: config.passport.saml.issuer,
      cert: config.passport.saml.cert,
      decryptionPvk: config.passport.saml.decryptionPvk,
      identifierFormat: config.passport.saml.identifierFormat,
    },
    function(profile, done) {
      console.log("This is what is returned by Saml", profile);
      
      const user = convertProfileToUser(profile);

      return done(null, user);
    }
  );

  passport.use(strategy);
};
