// Environment config
require('dotenv').config();

// App deps
const path = require('path');
const express = require('express');

// Controllers
const indexController = require('./controllers/index');
const authController = require('./controllers/auth');
const userController = require('./controllers/user');
const userRidesController = require('./controllers/user-rides');
const reactController = require('./controllers/react');

// Lib modules
const Store = require('./lib/store');
const stravaApi = require('./lib/strava-api');
const validateActivity = require('./lib/validate-activity');
const compareSegments = require('./lib/compare-segments');

// Setup app
const app = express();
// Get user store
const users = new Store('users', []);

// Setup react views
app.set('views', path.join(__dirname, '/templates'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(express.static('public'));

// Homepage
app.get('/', indexController);

// Profile API
app.get('/api/user/:uid', userController);

// Profile rides API
app.get('/api/user/:uid/rides', userRidesController);

// Token exchange route
app.get('/auth', authController);

// App
app.get('/*', reactController);

// This is a mess.  Don't code when severly hungover...
// Exchnging tokens and shiz, this should be a controller
// Was JSX a good call..?
// I think I'm having an existential crisis...
app.get('/profile/:uid/ride/:rid', (req, res) => {
  const existingUser = users.get().find((user) => {
    return user.athlete.id == req.params.uid;
  }).value();

  if (!existingUser) {
    return res.send('Not found...');
  }

  stravaApi.setCredential('access_token', existingUser.access_token);

  stravaApi.get(`/activities/${req.params.rid}`, (err, activity) => {
    if (err) {
      return res.send(err);
    }

    if (!validateActivity(activity)) {
      return res.send('Invalid activity...');
    }

    const mainActivity = Object.assign({}, activity);

    mainActivity.user = existingUser;

    stravaApi.get(`/activities/${req.params.rid}/related`, (err, relatedActivities) => {
      let friendRides = relatedActivities.filter((relatedActivity) => {
        return relatedActivity.athlete.friend;
      });

      console.log(friendRides);

      friendRides = friendRides.map((ride, i) => {
        const relatedExistingUser = users.get().find((user) => {
          return user.athlete.id == ride.athlete.id;
        }).value();

        if (relatedExistingUser) {
          stravaApi.setCredential('access_token', relatedExistingUser.access_token);

          stravaApi.get(`/activities/${ride.id}`, (err, activity) => {
            if (err) {
              return res.send(err);
            }

            const relatedActivity = Object.assign({}, activity);

            relatedActivity.user = relatedExistingUser;

            res.render('routes/ride', {
              users: [existingUser, relatedExistingUser],
              activities: [mainActivity].concat(relatedActivities),
              segments: compareSegments(mainActivity, [relatedActivity]),
            });
          });
        }
      });
    });
  });
});

// 404s
app.use((req, res, next) => {
  res.status(404);

  if (req.xhr || req.accepts('application/json')) {
    return res.send({
      error_code: 404
    });
  }

  res.render('routes/404');
});

// 500 errors
app.use((err, req, res, next) => {
  res.status(500);

  if (req.xhr || req.accepts('application/json')) {
    return res.send({
      error_code: 500,
      error: err,
    });
  }

  res.render('routes/500');
});

app.listen(process.env.PORT, () => console.log(`App running on port ${process.env.PORT}`));
