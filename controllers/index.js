const url = require('url');
const stravaApi = require('../lib/strava-api');

module.exports = function indexController (req, res) {
  res.render('routes/index', {
    strava: {
      authUrl: stravaApi.getAuthUrl({
        redirect_uri: url.resolve(process.env.BASE_URL, '/auth'),
      }),
    },
  });
}
