const { calculateDurationInSeconds } = require("../utils/timeUtils")
const { sortActivities } = require("./activitiesHelper")

/**
 * Function that creates activity sessions for users.
 * @param {Array} activities
 * @returns Array of session objects.
 */
function userSessionsCreator(activities) {
  const sessions = [];
  let sessionStartTime = null;
  let sessionActivityIds = [];
  let sessionDuration = 0;

  let userActivities = sortActivities(activities);

  userActivities.forEach((currentActivity, index) => {
    const nextActivity = userActivities[index + 1];
    
    sessionActivityIds.push(currentActivity.id);
    
    if (!nextActivity) return;
 
    if (!sessionStartTime) {
      sessionStartTime = currentActivity.first_seen_at;
    }
 
    const secondsBetweenActivities = calculateDurationInSeconds(
      currentActivity.answered_at,
      nextActivity.first_seen_at
    );
  
     if (secondsBetweenActivities > FIVE_MINUTES_IN_SECONDS) {
       sessionDuration = calculateDurationInSeconds(
         sessionStartTime,
         currentActivity.answered_at
       );
  
       sessions.push({
         started_at: sessionStartTime,
         ended_at: currentActivity.answered_at,
         activity_ids: sessionActivityIds,
         duration_seconds: sessionDuration,
       });
  
       sessionStartTime = null;
       sessionDuration = 0;
       sessionActivityIds = [];
     } else {
  
     }
  });
  
  return sessions;
}

/**
 * Function that makes a POST request 
 * @param {string} url
 */
 function postSessions(sessions) {
  return postData(POST_SESSIONS_URL, sessions, { headers: HEADERS })
}

module.exports = {
  userSessionsCreator,
  postSessions
}