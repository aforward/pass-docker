const fs = require('fs');

module.exports = {
  development: {
    app: {
      name: "Passport SAML strategy",
      port: process.env.PORT || 80
    },
    passport: {
      strategy: process.env.PASSPORT_STRATEGY || "saml",
      saml: {
        path: "/Shibboleth.sso/SAML2/POST",
        identifierFormat: process.env.IDENTIFIER_FORMAT || "",
        entryPoint:
          process.env.SAML_ENTRY_POINT ||
          "https://pass.local/idp/profile/SAML2/Redirect/SSO",
        issuer: process.env.SAML_ISSUER || "https://sp.pass/shibboleth",
        decryptionPvk: fs.readFileSync("privateKey.key", "utf-8"),
        cert: process.env.SAML_CERT || "MIIDFDCCAfygAwIBAgIVAN3vv+b7KN5Se9m1RZsCllp/B/hdMA0GCSqGSIb3DQEBCwUAMBUxEzARBgNVBAMMCmlkcHRlc3RiZWQwHhcNMTUxMjExMDIyMDE0WhcNMzUxMjExMDIyMDE0WjAVMRMwEQYDVQQDDAppZHB0ZXN0YmVkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAh91caeY0Q85uhaUyqFwP2bMjwMFxMzRlAoqBHd7gu6eo4duaeLz1BaoR2XTBpNNvFR5oHH+TkKahVDGeH5+kcnIpxI8JPdsZml1srvf2Z6dzJsulJZUdpqnngycTkGtZgEoC1vmYVky2BSAIIifmdh6s0epbHnMGLsHzMKfJCb/Q6dYzRWTCPtzE2VMuQqqWgeyMr7u14x/Vqr9RPEFsgY8GIu5jzB6AyUIwrLg+MNkv6aIdcHwxYTGL7ijfy6rSWrgBflQoYRYNEnseK0ZHgJahz4ovCag6wZAoPpBsuYlY7lEr89Ucb6NHx3uqGMsXlDFdE4QwfDLLhCYHPvJ0uwIDAQABo1swWTAdBgNVHQ4EFgQUAkOgED3iYdmvQEOMm6u/JmD/UTQwOAYDVR0RBDEwL4IKaWRwdGVzdGJlZIYhaHR0cHM6Ly9pZHB0ZXN0YmVkL2lkcC9zaGliYm9sZXRoMA0GCSqGSIb3DQEBCwUAA4IBAQBIdd4YWlnvJjql8+zKKgmWgIY7U8DA8e6QcbAf8f8cdE33RSnjI63Xsv/y9GfmbAVAD6RIAXPFFeRYJ08GOxGI9axfNaKdlsklJ9bk4ducHqgCSWYVer3sRQBjxyOfSTvk9YCJvdJVQRJLcCvxwKakFCsOSnV3t9OvN86Ak+fKPVB5j2fM/0fZKqjn3iqgdNPTLXPsuJLJO5lITRiBa4onmVelAiCstI9PQiaEck+oAHnMTnC9JE/BDHv3e4rwq3LznlqPw0GSd7xqNTdMDwNOWjkuOr3sGpWS8ms/ZHHXV1Vd22uPe70is00xrv14zLifcc8oj5DYzOhYRifRXgHX",
        forceAuthn: process.env.FORCE_AUTHN || true,
      },
    }
  }
};
