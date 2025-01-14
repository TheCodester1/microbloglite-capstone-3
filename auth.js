/* auth.js provides LOGIN-related functions */

"use strict";

// const apiBaseURL = "https://microbloglite.herokuapp.com";
// Backup server:
const apiBaseURL = "https://microbloglite.onrender.com";

// You can use this function to get the login data of the logged-in
// user (if any). It returns either an object including the username
// and token, or an empty object if the visitor is not logged in.
function getLoginData() {
  const loginJSON = window.localStorage.getItem("login-data");
  return JSON.parse(loginJSON) || {};
}

// You can use this function to see whether the current visitor is
// logged in. It returns either `true` or `false`.
function isLoggedIn() {
  const loginData = getLoginData();
  return Boolean(loginData.token);
}

// This function is already being used in the starter code for the
// landing page, in order to process a user's login. READ this code,
// and feel free to re-use parts of it for other `fetch()` requests
// you may need to write.
function login(loginData) {
  // POST /auth/login
  const options = {
    method: "POST",
    headers: {
      // This header specifies the type of content we're sending.
      // This is required for endpoints expecting us to send
      // JSON data.
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  };

  return fetch(apiBaseURL + "/auth/login", options)
    .then((response) => response.json())
    .then((loginData) => {
      window.localStorage.setItem("login-data", JSON.stringify(loginData));
      window.location.assign("./posts"); // redirect

      return loginData;
    });
}
// This is the `logout()` function you will use for any logout button
// which you may include in various pages in your app. Again, READ this
// function and you will probably want to re-use parts of it for other
// `fetch()` requests you may need to write.
document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("logoutButton");

  function logout() {
    const loginData = getLoginData();

    // GET /auth/logout
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${loginData.token}`,
      },
    };

    fetch(apiBaseURL + "/auth/logout", options)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .finally(() => {
        window.localStorage.removeItem("login-data");
        window.location.assign("../");
      });
  }

  logoutButton.addEventListener("click", logout);
});
