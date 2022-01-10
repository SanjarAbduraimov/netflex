import * as home from "./home.js";
import * as movie from "./movie.js";
import { displayArtist, fetchArtist } from "./artist.js";
import * as popularMovie from "./popularMovie.js";
document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("popstate", (e) => {
    location.reload();
  });

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
      movie.artistHandler();
    });
  }
  if (location.pathname === "/artist.html") {
    fetchArtist().then((artist) => {
      displayArtist(artist);
    });
  }
  if (location.pathname === "/popularMovie.html") {
    popularMovie.fetchPopularMovie(popularMovie).then((data) => {
      popularMovie.displayPopularMovie(data);
      popularMovie.popularMovieHandler();
      popularMovie.filterName();
      popularMovie.filters();
      popularMovie.toWatch();
    });
  }
});
