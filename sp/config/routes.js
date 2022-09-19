module.exports = function(app, config, passport) {
  app.get(
    "/auth/login",
    passport.authenticate(config.passport.strategy, {
      successRedirect: "/",
      failureRedirect: "/login",
      scope: ["email profile"]
    })
  );

  app.post(
    config.passport.saml.path || config.passport.saml.callbackUrl,
    passport.authenticate(config.passport.strategy, {
      failureRedirect: "/",
      failureFlash: true
    }),
    function(req, res) {
      res.redirect("/app/");
    }
  );

  app.get("/logout", function(req, res) {
    req.logout();
    // TODO: invalidate session on IP
    res.redirect("/");
  });
};
