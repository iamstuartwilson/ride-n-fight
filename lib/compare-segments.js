// This is a mess.  Don't code when severly hungover...
module.exports = function compareSegments (activity, relatedActivities) {
  const segments = {};

  activity.segment_efforts.forEach((effort) => {
    if (!(effort.segment.id in segments)
        || effort.elapsed_time < segments[effort.segment.id].elapsed_time) {
      const formattedEffort = Object.assign({}, effort);

      formattedEffort.athlete = activity.athlete;
      segments[effort.segment.id] = [formattedEffort];
    }
  });

  for (const segmentId in segments) {
    relatedActivities.forEach((relatedActivity) => {
      const matchedEfforts = relatedActivity.segment_efforts.filter((effort) => {
        return effort.segment.id == segmentId;
      });

      if (!matchedEfforts.length) {
        return;
      }

      matchedEfforts.sort((effortA, effortB) => {
        return effortA.elapsed_time - effortB.elapsed_time;
      });

      const formattedEffort = Object.assign({}, matchedEfforts.shift());

      formattedEffort.athlete = relatedActivity.athlete;
      segments[formattedEffort.segment.id].push(formattedEffort);
    });

    segments[segmentId].sort((effortA, effortB) => {
      return effortA.elapsed_time - effortB.elapsed_time;
    });

    if (segments[segmentId].length < 2) {
      delete segments[segmentId];
    }
  }

  return segments
}
