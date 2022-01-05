import * as home from "./home.js";
import * as movie from "./movie.js";
import * as displayPopularMovie from "./popularMovie.js";
document.addEventListener("DOMContentLoaded", () => {
  if (location.pathname === "/" || location.pathname === "/index.html") {
    home.fetchPopularMovies().then((data) => {
      home.displayData(data);
      home.movieHandler();
      home.setCoverBg(data.results[0].backdrop_path);
    });
  }
  if (location.pathname === "/movie.html") {
    console.log(history.state);
    movie.fetchMovie(history.state.id).then((data) => {
      movie.displayData(data);
    });
    movie.fetchCredits(history.state.id).then((data) => {
      movie.displayCreditsData(data);
    });
  }
  if (location.pathname === "/popularMovie.html") {
    fetchPopularMovie().then((data) => {
      displayPopularMovie(data);
    });
  }
});
