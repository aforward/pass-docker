const { response } = require("express");

module.exports = function(app, config, passport) {
  app.get(
    "/auth/login",
    passport.authenticate(config.passport.strategy, {
      successRedirect: "/app/",
      failureRedirect: "/",
      scope: ["email profile"]
    })
  );

  app.get("/auth/logout", function(req, res) {
    req.logout();
    
    res.redirect("/");
  });

  app.post(
    config.passport.saml.path || config.passport.saml.callbackUrl,
    passport.authenticate(config.passport.strategy, {
      successRedirect: "/app/",
      failureRedirect: "/auth/logout",
      failureFlash: true
    })
  );

  app.get('/auth/authenticated', (req, res) => {
    if (req.isAuthenticated()) {
      res.status(200);
    } else {
      res.status(401).send('You are not authenticated');
    }
  });
};
