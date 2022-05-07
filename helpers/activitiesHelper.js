const { default: axios } = require("axios");
const { GET_ACTIVITIES_URL, HEADERS } = require("../constants/index")


function getActivities() {
  return fetchData(GET_ACTIVITIES_URL, { headers: HEADERS })
}

async function fetchData(url, options) {
  try {
    const response = await axios.get(url, options)
    return response.data; 
  } catch(e) {
    console.log(e);
  }
}

module.exports= {
  getActivities,
  fetchData
}

