const url = require('url');
const moment = require('moment');
const NodeCache = require('node-cache');
const stravaApi = require('../lib/strava-api');
const users = require('../lib/users');
const validateActivity = require('../lib/validate-activity');

const activityCount = 50;

// Flush cache every 2 hours day
const cache = new NodeCache({
  stdTTL: 60 * 60 * 2,
});

module.exports = function userRidesController (req, res, next) {
  const user = users.get().find((user) => {
    return user.athlete.id == req.params.uid;
  }).value();

  if (!user) {
    return next();
  }

  const cachedData = cache.get(req.params.uid);

  if (cachedData && ! req.query.refresh) {
    return res.send(cachedData);
  }

  stravaApi.setCredential('access_token', user.access_token);

  stravaApi.get('athlete/activities', {per_page: activityCount}, (err, activities) => {
    if (err) {
      return next(err);
    }

    const validActivities = activities.filter(validateActivity);
    const groupActivities = [];
    // Will use this to check we have found related activites for each valid master
    let completedRequests = 0;

    validActivities.forEach((validActivity) => {
      stravaApi.get(`activities/${validActivity.id}/related`, (err, relatedActivities) => {
        if (err) {
          return next(err);
        }

        relatedActivities.map((relatedActivity) => {
          relatedActivity.user = users.get().find((user) => {
            return user.athlete.id == relatedActivity.athlete.id;
          }).value();

          return relatedActivity;
        })

        let friendActivities = relatedActivities.filter((relatedActivity) => {
          return relatedActivity.user;
        });

        if (friendActivities.length) {
          groupActivities.push({
            master: validActivity,
            friends: friendActivities,
          });
        }

        completedRequests ++;

        if (completedRequests === validActivities.length) {
          groupActivities.sort((activityA, activityB) => {
            if (moment(activityA.master.start_date).isBefore(moment(activityB.master.start_date))) {
              return 1;
            }

            return -1;
          });

          cache.set(req.params.uid, {
            user,
            groupActivities
          });

          res.send(cache.get(req.params.uid));
        }
      });
    });
  });
}
