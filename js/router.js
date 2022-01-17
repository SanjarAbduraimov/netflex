import { showLoader, hideLoader } from "./loader.js";
import * as home from "./home.js";
import * as movie from "./movie.js";
import { displayArtist, fetchArtist } from "./artist.js";
import * as popularMovie from "./popularMovie.js";
document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("popstate", (e) => {
      location.reload()
  })
  if (location.pathname === "/" || location.pathname === "/index.html") {
    home.fetchPopularMovies().then((data) => {
      hideLoader();
      home.displayData(data);
      home.movieHandler();
      home.setCoverBg(data.results[0].backdrop_path);
    });
  }
  if (location.pathname === "/movie.html") {
    movie.fetchMovie(history.state.id).then((data) => {
      hideLoader();
      movie.isFavourite(data.id);
      movie.displayData(data);
      const favouriteBtn = document.querySelector(".mark__as__favourite");
      // favouriteBtn.onclick = (e) => {
      //   movie.markAsFavouriteHandler(e);
      // };
      favouriteBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        movie.markAsFavouriteHandler(e,data.id);
      })
      const watchlistBtn = document.querySelector(".add__to__watchlist");
      // watchlistBtn.onclick = (e) => {
      //   movie.addToWatchlistHandler(e);
      // };
      watchlistBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        movie.addToWatchlistHandler(e);
        
      })
    });
    movie.fetchCredits(history.state.id).then((data) => {
      movie.displayCreditsData(data);
      movie.artistHandler();
    });
  }
  if (location.pathname === "/artist.html") {
    fetchArtist().then((artist) => {
      hideLoader();
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
