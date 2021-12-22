import * as details from "./detail.js";
import { displayMovies, fetchMovies, movieEvents, saveData } from "./home.js";

document.addEventListener("DOMContentLoaded", () => {
  history.pushState = ((f) =>
    function pushState() {
      var ret = f.apply(this, arguments);
      window.dispatchEvent(new Event("pushstate"));
      window.dispatchEvent(new Event("locationchange"));
      return ret;
    })(history.pushState);

  history.replaceState = ((f) =>
    function replaceState() {
      var ret = f.apply(this, arguments);
      window.dispatchEvent(new Event("replacestate"));
      window.dispatchEvent(new Event("locationchange"));
      return ret;
    })(history.replaceState);
  if (
    location.pathname === "/" ||
    location.pathname.startsWith("/index.html")
  ) {
    fetchMovies()
      .then((movies) => {
        displayMovies(movies);
        movieEvents();
        saveData(movies);
      })
      .then((i) => {});
  }
  if (location.pathname.startsWith("/details.html")) {
    details.fetchDetails(history.state.id).then((data) => {
      details.displayDetails(data);
    });
  }
  if (location.pathname.startsWith("/profile.html")) {
    // details.fetchDetails(history.state.id).then((data) => {
    //   details.displayDetails(data);
    // });
  }
});

window.addEventListener("popstate", () => {
  window.dispatchEvent(new Event("locationchange"));
  console.log("changed");
});
// console.log(history);
// getComponent().then((data) => {
//   rootDiv.innerHTML = data;
// });
// const rootDiv = document.body;

// console.log(window.location.hash);
// async function getComponent() {
//   const routes = {
//     "": fetch("index.html"),
//     "#/detail": fetch("detail.html"),
//     "#/profile": fetch("profile.html"),
//   };
//   const request = await routes[window.location.hash];
//   const component = await request.text();
//   return component;
// }

// // export default routes;
