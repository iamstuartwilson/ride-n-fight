const url = require('url');
const stravaApi = require('../lib/strava-api');
const users = require('../lib/users');

module.exports = function authController (req, res) {
  stravaApi.tokenExchange(req.query.code, (err, data) => {
    if (err) {
      return req.send(err);
    }

    const existingUser = users.get().find((user) => {
      return user.athlete.id == data.athlete.id;
    }).value();

    if (!existingUser) {
      users.get().push(data).write();
    }

    return res.redirect(url.resolve('/user/', `${data.athlete.id}`));
  });
}
