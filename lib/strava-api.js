const stravaClient = require('bikedujour-strava-api');

// Setup and export strava client with creds
module.exports = stravaClient({
  client_id: process.env.STRAVA_CLIENT_ID,
  client_secret: process.env.STRAVA_CLIENT_SECRET,
});
