require("dotenv").config();

const { AUTH_TOKEN } = process.env;

const API_BASE_URL = "https://api.slangapp.com/challenges/v1";

const GET_ACTIVITIES_URL = `${API_BASE_URL}/activities`;

const POST_SESSIONS_URL = `${API_BASE_URL}/activities/sessions`;

const HEADERS = {
    Authorization: `Basic ${AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

module.exports = {
  AUTH_TOKEN,
  API_BASE_URL,
  GET_ACTIVITIES_URL,
  POST_SESSIONS_URL,
  HEADERS,
};