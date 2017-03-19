// Environment config
require('dotenv').config();
const ENV = process.env;

// App deps
const path = require('path');
const express = require('express');
const stravaClient = require('bikedujour-strava-api');
const Store = require('./lib/store');
const validateActivity = require('./lib/validate-activity');
const compareSegments = require('./lib/compare-segments');

// Setup app
const app = express();
// Get user store
const users = new Store('users', []);
// Setup strava client
const stravaApi = stravaClient({
  client_id: ENV.STRAVA_CLIENT_ID,
  client_secret: ENV.STRAVA_CLIENT_SECRET,
});

// Setup react views
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// Homepage
app.get('/', (req, res) => {
  res.render('routes/index', {
    strava: {
      authUrl: stravaApi.getAuthUrl({
        redirect_uri: `${ENV.BASE_URL}/token`,
      }),
    },
  });
});

// Token exchange route
app.get('/token', (req, res, next) => {
  stravaApi.tokenExchange(req.query.code, (err, data) => {
    const existingUser = users.get().find((user) => {
      return user.athlete.id == data.athlete.id;
    }).value();

    if (!existingUser) {
      users.get().push(data).write();
    }

    return res.redirect(`/profile/${data.athlete.id}`);
  });
});

app.get('/profile/:uid', (req, res) => {
  const existingUser = users.get().find((user) => {
    return user.athlete.id == req.params.uid;
  }).value();

  if (!existingUser) {
    return res.send('Not found...');
  }

  stravaApi.setCredential('access_token', existingUser.access_token);

  stravaApi.get('athlete/activities', (err, data) => {
    const rides = data.filter((activity) => {
      return activity.type === 'Ride'
             && activity.athlete_count > 1;
    });

    rides.map((ride) => {
      ride.url = path.join(req.originalUrl, `/ride/${ride.id}`);
    });

    res.render('routes/profile', {
      user: existingUser,
      rides: rides,
    });
  });
});

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

app.listen(ENV.PORT, () => console.log(`App running on port ${ENV.PORT}`));
