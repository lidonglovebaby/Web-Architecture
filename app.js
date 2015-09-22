/*jslint nomen: true */
/*jslint unparam: true*/
/*jslint node: true */
"use strict";
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var methodOverride = require('method-override');
var swig = require('swig');
var orm = require('orm');

var models = require('./models/models.js');
var router = require('./controller/router.js');

var app = express();

// view engine setup,use swig to render web page
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.set('view cache', false);
// will disable swig's cache
swig.setDefaults({
    cache: false
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use method-override to enable specification of the HTTP method through a query string
app.use(methodOverride('_method'));

app.use(function (req, res, next) {
    models(function (err, db) {
        if (err) {
            console.log(err);
            return next(err);
        }
        req.models = db.models;
        req.db = db;
        return next();
    });
});

router(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
