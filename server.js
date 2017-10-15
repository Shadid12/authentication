const express = require('express')
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})