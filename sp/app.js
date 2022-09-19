const express = require("express");
const path = require("path");
const passport = require("passport");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const httpProxy = require('http-proxy');
const ensureAuthenticated = require('./middleware/ensure-auth');

var env = process.env.NODE_ENV || "development";
const config = require("./config/config")[env];

require("./config/passport")(passport, config);

var app = express();

// create a proxy server for each of the pass services
const apiProxy = httpProxy.createProxyServer();
const fcrepo = 'http://fcrepo:8080/fcrepo',
      userService = 'http://fcrepo:8080/',
      ember = 'http://ember:81/',
      elasticSearch = 'http://elasticsearch:9200/',
      schemaService = 'http://schemaservice:8086',
      policyService = 'http://policyservice:8088', 
      doiService = 'http://doiservice:8080/',
      downloadService = 'http://downloadservice:6502';

app.set("port", config.app.port);
app.set("views", __dirname + "/app/views");
app.set("view engine", "pug");
app.use(morgan("combined"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || "This is not a secret, friend."
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

require("./config/routes")(app, config, passport);

app.all("/fcrepo/*", ensureAuthenticated, function(req, res) {
  apiProxy.web(req, res, {target: fcrepo});
});

app.all("/pass-user-service/*", ensureAuthenticated, function(req, res) {
  const user = req.user;

  req.headers['DISPLAY_NAME_HEADER'] = user.displayName;
  req.headers['EMAIL_HEADER'] = user.email;
  req.headers['EPPN_HEADER'] = user.eppn;
  req.headers['GIVENNAME_HEADER'] = user.givenName;
  req.headers['SN_HEADER'] = user.surname;
  req.headers['SCOPED_AFFILIATION_HEADER'] = user.scopedAffiliation;
  req.headers['EMPLOYEE_ID_HEADER'] = user.employeeNumber;
  req.headers['HOPKINS_ID_HEADER'] = user.uniqueId;
  req.headers['EMPLOYEE_ID_TYPE'] = user.employeeIdType;
  req.headers['HOPKINS_ID_TYPE'] = user.uniqueIdType;
  req.headers['JHED_ID_TYPE'] = user.jhedIdType;

  apiProxy.web(req, res, {target: userService});
});

app.all("/app/*", ensureAuthenticated, function(req, res) {
  apiProxy.web(req, res, {target: ember});
});

app.all("/pass/_search/*", ensureAuthenticated, function(req, res) {
  apiProxy.web(req, res, {target: elasticSearch});
});

app.all("/schemaservice/*", ensureAuthenticated, function(req, res) {
  apiProxy.web(req, res, {target: schemaService});
});

app.all("/policyservice/*", ensureAuthenticated, function(req, res) {
  apiProxy.web(req, res, {target: policyService});
});

app.all("/doiservice/*", ensureAuthenticated, function(req, res) {
  apiProxy.web(req, res, {target: doiService});
});

app.all("/downloadservice/*", ensureAuthenticated, function(req, res) {
  apiProxy.web(req, res, {target: downloadService});
});

app.listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});
