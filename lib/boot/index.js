/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express();
var translations = require('lib/translations');
var t = require('t-component');
var favicon = require('serve-favicon');
var config = require('lib/config');

/**
 * Set `views` directory for module
 */

app.set('views', __dirname);

/**
 * Set `view engine` to `jade`.
 */

app.set('view engine', 'jade');

/**
 * middleware for favicon
 */

app.use(favicon(__dirname + '/images/favicon.ico'));

/**
 * Config application
 */

require('lib/setup')(app);

/**
 * Link models with
 * mongoDB database
 */

require('lib/models')(app);

/**
 * Load user routes
 * API service
 */

app.use("/api", require('lib/user'));

/**
 * To generate random lorem ipsum text.
 */
app.use("/lorem", require('lib/lorem'));

/**
 * API Bill
 */
app.use("/api/bill", require('lib/bill-api'));

/**
 * Load localization dictionaries to translation application
 */

translations.help(t);

/**
 * Init `t-component` component with parameter locale
 */

t.lang(config('locale'));

/**
 * GET index page.
 */

app.get('*', function(req, res) {
  res.render('index');
});
