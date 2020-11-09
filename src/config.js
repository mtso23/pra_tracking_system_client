const config = {
  LOGIN_URL: "https://pra-tracking-dev.herokuapp.com/api/login",
  // Set initial access control based on local storage. If access hasn't expired get access
  ACCESS_CONTROL:
    (localStorage.getItem("expiry") &&
      new Date(localStorage.getItem("expiry")) >= new Date() &&
      localStorage.getItem("access")) ||
    "none",
  SESSION_LENGTH: 14 * 24 * 60 * 60 * 1000, // 2 weeks in ms
};

export default config;
