const { AUTH_TOKEN } = require("./constants/index")
const { getActivities, classifyActivitiesByUser } = require("./helpers/activitiesHelper")

function main() {
    return getActivities()
    .then((response) => {
        return classifyActivitiesByUser(response.activities)

    } ) 
    .then((sessions)=> postSessions(sessions))
    .catch((error)=> console.log(error))
}

main();
