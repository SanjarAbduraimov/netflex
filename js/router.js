import { showLoader, hideLoader } from "./loader.js";
import * as home from "./home.js";
import * as movie from "./movie.js";
import { displayArtist, fetchArtist } from "./artist.js";
import * as popularMovie from "./popularMovie.js";
import { displaySearchResults, fetchSearchMovie } from "./search.js";
document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("popstate", (e) => {
    location.reload();
  });
  if (location.pathname === "/" || location.pathname === "/index.html") {
    home.fetchPopularMovies().then((data) => {
      hideLoader();
      home.displayData(data);
      home.movieHandler();
      home.searchMovieHandler(location, history);
      home.setCoverBg(data.results[0].backdrop_path);
    });
  }
  if (location.pathname === "/movie.html") {
    movie.fetchMovie(history.state.id).then((data) => {
      const favBtn = document.querySelector(".fas.fa-heart");
      hideLoader();
      movie.fetchIsFavourite(data.id).then((data) => {
        if (data.favorite) {
          favBtn.style.color = "red";
        }
      });
      movie.displayData(data);
      const favouriteBtn = document.querySelector(".mark__as-favourite");
      favouriteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        movie.markAsFavouriteHandler(e, data.id);
      });
      // const watchlistBtn = document.querySelector(".add__to__watchlist");
      // watchlistBtn.onclick = (e) => {
      //   movie.addToWatchlistHandler(e);
      // };
      // watchlistBtn.addEventListener("click", (e) => {
      //   e.preventDefault();
      //   movie.addToWatchlistHandler(e);
      // });
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
      const cardOption = document.querySelector(".card__options");
      console.log(cardOption);
      const actions = document.querySelector(".hero__actions");
      // popularMovie.popularMovieHandler();
      console.log(actions);
      cardOption.addEventListener("click", (e) => {
        if ((actions.style.display == "none!important")) {
          actions.style.display = "flex!important";
        } else {
          actions.style.display = "none!important";
        }
      });
      popularMovie.popularMovieHandler();

    });
  }
  if (location.pathname === "/profile.html") {
    fetchArtist().then((artist) => {
      hideLoader();
      displayArtist(artist);
    });
  }
  if (location.pathname === "/search.html") {
    console.log(history.state, "salom");
    fetchSearchMovie(history.state.query).then((data) => {
      console.log(data, "Search");
      displaySearchResults(data);
    });
  }
});
