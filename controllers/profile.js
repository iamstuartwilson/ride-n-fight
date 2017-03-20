const url = require('url');
const moment = require('moment');
const stravaApi = require('../lib/strava-api');
const users = require('../lib/users');
const validateActivity = require('../lib/validate-activity');

module.exports = function profileRidesController (req, res, next) {
  const user = users.get().find((user) => {
    return user.athlete.id == req.params.uid;
  }).value();

  if (!user) {
    return next();
  }

  res.send({
    user,
  })
}
