const { calculateDurationInSeconds } = require("../utils/timeUtils")
const { POST_SESSIONS_URL, HEADERS } = require("../constants/index")
const { postData } = require ("../utils/fetchUtils")

/**
 * Function that sort an array of activities in ascendent order.
 * @param {Array} userActivities
 * @returns Sorted array of activity objects.
 */
 function sortActivities(activities) {
  if (!Array.isArray(activities)) {
    throw new Error("Function: sortActivities. The input must be an array.");
  }

  return activities.sort((a, b) => {
    const firstDate = new Date(a.first_seen_at);
    const secondDate = new Date(b.first_seen_at);
    return firstDate - secondDate;
  });
}

/**
 * Function that creates activity sessions for users.
 * @param {Array} activities
 * @returns Array of session objects.
 */
function userSessionsCreator(activities) {
  const sessions = [];
  const FIVE_MINUTES_IN_SECONDS = 300;
  let sessionStartTime = null;
  let sessionActivityIds = [];
  let sessionDuration = 0;

  let userActivities = sortActivities(activities);

  userActivities.forEach((currentActivity, index) => {
    const nextActivity = userActivities[index + 1];
    
    sessionActivityIds.push(currentActivity.id);
    
    if (!sessionStartTime) {
      sessionStartTime = currentActivity.first_seen_at;
    }
    if (!nextActivity) {
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
      return;
    };
    
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
     } 
     return;
  });
  
  return sessions;
}

/**
 * Function that makes a POST request 
 * @param {string} url
 */
 function postSessions(sessions) {
  return postData(POST_SESSIONS_URL, sessions, { headers: HEADERS })
    .then(response => console.log(response));
  
}

module.exports = {
  userSessionsCreator,
  postSessions
}
