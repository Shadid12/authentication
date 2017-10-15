const express = require('express')
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');

mongoose.connect(keys.mongoURI);
const app = express()

require('./models/User');
require('./services/passport');

//passport and cookies settings
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

//routes
app.get('/', function (req, res) {
  res.send('Hello World!')
})

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT);