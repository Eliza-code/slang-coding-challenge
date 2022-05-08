const { default: axios } = require("axios");

async function fetchData(url, options) {
    try {
        const response = await axios.get(url, options)
        return response.data; 
    } catch(e) {
        console.log(e);
    }
}

async function postData(url, body, options) {
    try{
        const response = await axios.post(url, body, options)
        return response;
    } catch(e) {
        console.log(e);
    }
}

module.exports = {
    fetchData,
    postData
}