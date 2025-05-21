const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const corsConfig = require('./corsConfig');
const cookieParser = require('cookie-parser');

const serverConfig = (app) => {
  app.use(morgan('dev'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static('public'));
  app.use(cors(corsConfig));
  app.use(cookieParser());
};

module.exports = serverConfig;
