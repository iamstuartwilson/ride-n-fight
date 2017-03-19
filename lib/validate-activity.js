module.exports = function validateActivity (activity) {
  return activity.type === 'Ride'
         && activity.athlete_count > 1;
};
