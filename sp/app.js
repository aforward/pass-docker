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

console.log("Using configuration :", config);

require("./config/passport")(passport, config);

var app = express();

app.set('trust proxy', 1); // trust first proxy

// create a proxy server for each of the pass services
const apiProxy = httpProxy.createProxyServer();
const fcrepo = 'http://fcrepo:8080/',
      userService = 'http://fcrepo:8080/',
      ember = 'http://ember:81/',
      elasticSearch = 'http://elasticsearch:9200/pass/_search',
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

apiProxy.on('proxyReq', function(proxyReq, req, _res, _options) {
  const user = req.user;

  proxyReq.setHeader('Displayname', user.displayName);
  proxyReq.setHeader('Mail', user.email);
  proxyReq.setHeader('Eppn', user.eppn);
  proxyReq.setHeader('Givenname', user.givenName);
  proxyReq.setHeader('Sn', user.surname);
  proxyReq.setHeader('Affiliation', user.scopedAffiliation);
  proxyReq.setHeader('Employeenumber', user.employeeNumber);
  proxyReq.setHeader('unique-id', user.uniqueId);
  proxyReq.setHeader('employeeid', user.employeeIdType);
});

app.all("/fcrepo/*", ensureAuthenticated, function(req, res) {
  const base64Creds = Buffer.from(`${process.env.PASS_FEDORA_USER}:${process.env.PASS_FEDORA_PASSWORD}`).toString('base64')

  req.headers['Authorization'] = `Basic ${base64Creds}`;

  apiProxy.web(req, res, {target: fcrepo});
});

app.all("/pass-user-service/*", ensureAuthenticated, function(req, res) {
  apiProxy.web(req, res, {target: userService});
});

app.all("/app/*", ensureAuthenticated, function(req, res) {
  apiProxy.web(req, res, {target: ember});
});

app.all("/es/*", ensureAuthenticated, function(req, res) {
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
