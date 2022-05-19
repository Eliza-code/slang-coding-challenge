const { getActivities, classifyActivitiesByUser } = require("./helpers/activitiesHelper")
const { postSessions } = require("./helpers/sessionsHelper")

// function main() {
//   return getActivities()
//   .then((response) => {
//     return classifyActivitiesByUser(response.activities)

//   } ) 
//   .then((sessions)=> postSessions({user_sessions: sessions}))
//   .catch((error)=> console.log(error))
// }


async function main () {
  const {activities} =  await getActivities()
  const sessions = classifyActivitiesByUser(activities)
  await postSessions({user_sessions: sessions})
}

main();
