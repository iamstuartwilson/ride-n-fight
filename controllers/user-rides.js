const url = require('url');
const moment = require('moment');
const stravaApi = require('../lib/strava-api');
const users = require('../lib/users');
const validateActivity = require('../lib/validate-activity');

const activityCount = 99;

const cache = {};

module.exports = function userRides (req, res, next) {
  const user = users.get().find((user) => {
    return user.athlete.id == req.params.uid;
  }).value();

  if (!user) {
    return next();
  }

  if (req.params.uid in cache) {
    return res.send(cache[req.params.uid]);
  }

  stravaApi.setCredential('access_token', user.access_token);

  stravaApi.get('athlete/activities', {per_page: activityCount}, (err, activities) => {
    if (err) {
      return next(err);
    }

    const validActivities = activities.filter(validateActivity);
    const groupActivities = [];

    validActivities.forEach((validActivity, i) => {
      stravaApi.get(`activities/${validActivity.id}/related`, (err, relatedActivities) => {
        if (err) {
          return next(err);
        }

        let friendActivities = relatedActivities.filter((relatedActivity) => {
          return relatedActivity.athlete.friend;
        });

        if (friendActivities.length) {
          groupActivities.push({
            master: validActivity,
            friends: friendActivities,
          });
        }

        if (i === validActivities.length - 1) {
          groupActivities.sort((activityA, activityB) => {
            if (moment(activityA.master.start_date).isBefore(moment(activityB.master.start_date))) {
              return 1;
            }

            return -1;
          });

          cache[req.params.uid] = {
            user,
            groupActivities
          };

          res.send(cache[req.params.uid]);
        }
      });
    });
  });
}