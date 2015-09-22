/*jslint nomen: true */
/*jslint node: true */
"use strict";

var path = require('path');

//set the environment of application
var config = {
        path: path.normalize(path.join(__dirname, '..')),
        port: process.env.NODE_PORT || 3000,
        database: {
            protocol: "sqlite",
            pathname: path.join(__dirname, 'sqlite.sqlite3')
        }
    };

module.exports = config;
