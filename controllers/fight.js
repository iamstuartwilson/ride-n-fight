const NodeCache = require('node-cache');
const stravaApi = require('../lib/strava-api');
const compareSegments = require('../lib/compare-segments');
const userRides = require('./user-rides');

// Flush cache every 2 hours day
const cache = new NodeCache({
  stdTTL: 60 * 60 * 24,
});

module.exports = function fightController (req, res, next) {
  userRides(req, {
    send: (userRides) => {
      const cachedData = cache.get(req.params.uid);

      if (cachedData && ! req.query.refresh) {
        return res.send(cachedData);
      }

      const fightRide = userRides.groupActivities.filter((ride) => {
        return ride.master.id == req.params.fid;
      }).pop();

      if (!fightRide) {
        return next();
      }

      stravaApi.setCredential('access_token', userRides.user.access_token);

      stravaApi.get(`/activities/${req.params.fid}`, (err, fullActivity) => {
        if (err) {
          return next(err);
        }

        let friendFullActivities = [];

        fightRide.friends.forEach((friendActivity) => {
          stravaApi.setCredential('access_token', friendActivity.user.access_token);

          stravaApi.get(`/activities/${friendActivity.id}`, (err, friendFullActivity) => {
            if (err) {
              return next(err);
            }

            friendFullActivities.push(friendFullActivity);

            if (friendFullActivities.length === fightRide.friends.length) {
              cache.set(req.params.fid, compareSegments(fullActivity, friendFullActivities));

              res.send(cache.get(req.params.fid));
            }
          });
        });
      });
    }
  }, next);
}
