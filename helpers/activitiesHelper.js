const { GET_ACTIVITIES_URL, HEADERS } = require("../constants/index")
const { fetchData } = require("../utils/fetchUtils")
const { userSessionsCreator } = require("./sessionsHelper")

/**
 * Function that makes a GET request and returns an object with users activities.
 * @param {string} url
 */
function getActivities() {
  return fetchData(GET_ACTIVITIES_URL, { headers: HEADERS })
}


/**
 * Function that classify arrays of activities by users id's.
 * @param {Array} activities
 * @returns Object with users id's and their corresponding activity arrays.
 */
function classifyActivitiesByUser(activities) {
  const users = {};

  activities.forEach((act) => {
    const userId = act.user_id;

    const activity = {
      id: act.id,
      first_seen_at: act.first_seen_at,
      answered_at: act.answered_at,
    };

    if (!users[userId]) {
      users[userId] = [activity];
    } else {
      const prevActivities = users[userId];
      users[userId] = [...prevActivities, activity];
    }
  });

  for (let user in users) {
    const userActivities = users[user];
    users[user] = userSessionsCreator(userActivities);
  }

  return users;
}

module.exports = {
  getActivities,
  classifyActivitiesByUser
}
