// Environment config
require('dotenv').config();
const ENV = process.env;

// App deps
const path = require('path');
const express = require('express');
const stravaApi = require('bikedujour-strava-api')({
  client_id: ENV.STRAVA_CLIENT_ID,
  client_secret: ENV.STRAVA_CLIENT_SECRET,
});
const store = require('./lib/store');
const users = store('users', []);

// Setup app
const app = express();

// Setup react views
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.get('/', (req, res) => {
  res.render('routes/index', {
    strava: {
      authUrl: stravaApi.getAuthUrl({
        redirect_uri: `${ENV.BASE_URL}/token`,
      }),
    },
  });
});

app.get('/token', (req, res, next) => {
  stravaApi.tokenExchange(req.query.code, (err, data) => {
    const existingUser = users.get().find((user) => {
      return user.athlete.id == req.params.id;
    }).value();

    if (!existingUser) {
      users.get().push(data).write();
    }

    return res.redirect(`/profile/${data.athlete.id}`);
  });
});

app.get('/profile/:id', (req, res) => {
  const existingUser = users.get().find((user) => {
    return user.athlete.id == req.params.id;
  }).value();

  if (existingUser) {
    return res.render('routes/profile', existingUser);
  }

  res.send('Not found...');
});

app.listen(ENV.PORT, () => console.log(`App running on port ${ENV.PORT}`));
