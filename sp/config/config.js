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
        path: "/auth/Shibboleth.sso/SAML2/POST",
        identifierFormat: process.env.IDENTIFIER_FORMAT || "",
        entryPoint:
          process.env.SAML_ENTRY_POINT ||
          "https://pass.local/idp/profile/SAML2/Redirect/SSO",
        issuer: process.env.SAML_ISSUER || "https://sp.pass/shibboleth",
        decryptionPvk: fs.readFileSync("privateKey.key", "utf-8"),
        // cert: fs.readFileSync("certificate.crt", "utf-8")
        cert: process.env.SAML_CERT || "MIIDFDCCAfygAwIBAgIVAN3vv+b7KN5Se9m1RZsCllp/B/hdMA0GCSqGSIb3DQEBCwUAMBUxEzARBgNVBAMMCmlkcHRlc3RiZWQwHhcNMTUxMjExMDIyMDE0WhcNMzUxMjExMDIyMDE0WjAVMRMwEQYDVQQDDAppZHB0ZXN0YmVkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAh91caeY0Q85uhaUyqFwP2bMjwMFxMzRlAoqBHd7gu6eo4duaeLz1BaoR2XTBpNNvFR5oHH+TkKahVDGeH5+kcnIpxI8JPdsZml1srvf2Z6dzJsulJZUdpqnngycTkGtZgEoC1vmYVky2BSAIIifmdh6s0epbHnMGLsHzMKfJCb/Q6dYzRWTCPtzE2VMuQqqWgeyMr7u14x/Vqr9RPEFsgY8GIu5jzB6AyUIwrLg+MNkv6aIdcHwxYTGL7ijfy6rSWrgBflQoYRYNEnseK0ZHgJahz4ovCag6wZAoPpBsuYlY7lEr89Ucb6NHx3uqGMsXlDFdE4QwfDLLhCYHPvJ0uwIDAQABo1swWTAdBgNVHQ4EFgQUAkOgED3iYdmvQEOMm6u/JmD/UTQwOAYDVR0RBDEwL4IKaWRwdGVzdGJlZIYhaHR0cHM6Ly9pZHB0ZXN0YmVkL2lkcC9zaGliYm9sZXRoMA0GCSqGSIb3DQEBCwUAA4IBAQBIdd4YWlnvJjql8+zKKgmWgIY7U8DA8e6QcbAf8f8cdE33RSnjI63Xsv/y9GfmbAVAD6RIAXPFFeRYJ08GOxGI9axfNaKdlsklJ9bk4ducHqgCSWYVer3sRQBjxyOfSTvk9YCJvdJVQRJLcCvxwKakFCsOSnV3t9OvN86Ak+fKPVB5j2fM/0fZKqjn3iqgdNPTLXPsuJLJO5lITRiBa4onmVelAiCstI9PQiaEck+oAHnMTnC9JE/BDHv3e4rwq3LznlqPw0GSd7xqNTdMDwNOWjkuOr3sGpWS8ms/ZHHXV1Vd22uPe70is00xrv14zLifcc8oj5DYzOhYRifRXgHX",
        // decryptionPvk: process.env.DECRYPTION_KEY || "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDXCpN+VxcuCj/TiYx9ATVQHOLPgXNevMZxON9wOmcz3YyqXudzSMZgy8ntJKm7Jo3wbRvksGugcgKXyffQT6syYU4XLy85BLdvlW640Mh1K2ln+fBg2RJ1tJdX2ezU97QuH0hvPLnVs36e7kxaXd5kyDONohPUCgmgHDDYUec6btxFJXkYKyTkDdt5YiYVls+DrpzUdaw7zUA2yx7kmudxs+7Mf1NuwtDNfdbmJSk5arwUe2HOiDuGctiCY7uVnyUYbS43ZLge3VVm0JCG+MxnYXqdR4a4fdy3OvZC6ePbUGYiDwuPd/puq7ScJNcmIMQVRls9FW3b60vqh34p3PxjAgMBAAECggEAaRI72yGGq/JKGXw97t5mREy47hccXg/zDmNxmY6P2qHIF37jrErE04r/kSW24UEHXZCSbn1dOTo71hrTQS+MQMOWunFNq5iIYLctMJSjPc0GZc2UDF5ETMr+n+hVdgHKQjb6149eZfKcTd+14vm2rpu7xNqKwbJd3aOooinyx3N6UMWMAIIqx+FbOMlKbcgcLmoQBkMF/ajtvFNLEIgSGA8hlF6isVTYq8lnyAJceQSQkmO6eFEc8PLmnejUUgzOX1Rdvgae2V9HYi1QIyV8q16ZMiQ5Cw3HMLemXyebgtA0NSmAsU02WrOteaSa0DNFxIDwl0tm4y1qjHB/Lk8oEQKBgQDuRZfME1mqWXG0zkVqp5sb3c4Iojz2gKZQoBy8erV6AO6QC1N/ZOiiJEHNF17BydMTIylljNPCgJcu+Uj2HiYZbwLotEIn2bVROiibyFAUp8fBz/N/LUYI5URy/sJWE2MyVh3BW7KtVaEbzNNyT43pn3JYE6VIsK3P4BtdlN+jRwKBgQDnCoHKMsTy8DP5TnOrsBfsMmcXRX7ylGtbkX4WJcIJ8Jv6PFUzB4mdF5L1QCLM+JgMBNcmpKX17bMuekmFeL4x05J9xkED/6as2MnFMJVvvjs00qhABdTKIHpt6hrF9oVUXw9JUP/W9KqIlh/nfnEJcBEEhOEXD91ULme/03jUBQKBgQDFjkoX2ItlpJeUc9o2XhVK+5LSscGeGHjNLJPm6k8BgzhJkjp+y+neVfWA2LmmL3Kk0WiHXEZPZFL1jZcjCUhJmjNtQdgANpARcwkscN+E4L/NQGABuEXzJjSkq/nxaE289I3jPeZdtTvJUwCWLMPbSmqCAHfwVx0l2AiYhNEQDQKBgGSFm8a/pBUXEWXtDkKq0R3BKD1lzT/592PVv4gfUXdFqneLfH5BT0x8D0KJbxrDJlREXt+/Tz3a99TG++oIiKfhJ6F1eqAkwP3/LHqREtOVbukipnWEk/qFev8Lli5/fa8h1OLPTSDXPsNCngr4ZnH2wlC3B8Ai9OdFcXpypeWJAoGAbbNruXffIFN+y/drj9QhQUApCqQ7uM22NIf9/kpdPMEUd0lv0NO9Gfvl9+jOaFW2aa1Cr2d0vk7D+tjstDE6yOzz9nhYdk1es7ze3bKH8LBaXXxJjzv7pwIquamRxTw9lmlEmYlXBBkQKzosNtUta12377c9WHxltjMsAZ3hKG8"
      },
    }
  }
};
