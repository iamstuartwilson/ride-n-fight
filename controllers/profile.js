const url = require('url');
const moment = require('moment');
const stravaApi = require('../lib/strava-api');
const users = require('../lib/users');
const validateActivity = require('../lib/validate-activity');

module.exports = function authController (req, res, next) {
  const existingUser = users.get().find((user) => {
    return user.athlete.id == req.params.uid;
  }).value();

  if (!existingUser) {
    return next();
  }

  stravaApi.setCredential('access_token', existingUser.access_token);

  stravaApi.get('athlete/activities', {per_page: 50}, (err, activities) => {
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
            if (moment(activityA.start_date).isBefore(moment(activityB.start_date))) {
              return -1;
            }

            return 1;
          });

          res.send({
            existingUser,
            groupActivities
          });
        }
      });
    });
  });
}
