import * as home from "./home.js";
import * as movie from "./movie.js";
import { displayArtist, fetchArtist, fetchKnownFor, displayKnownFor, displayInforms, fetchInforms, fetchCombinedCredits, displayCombinedCredits, movieHandler } from "./artist.js";
document.addEventListener("DOMContentLoaded", () => {
    // window.addEventListener("popstate", (e) => {
    //     location.reload()
    // })
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
            const favouriteBtn = document.querySelector(".mark__as__favourite")
            favouriteBtn.onclick = (e) => {
                movie.markAsFavouriteHandler(e)
            }
            const watchlistBtn = document.querySelector(".add__to__watchlist")
            watchlistBtn.onclick = (e) => {
                movie.addToWatchlistHandler(e)
            }
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
        fetchKnownFor().then((artist) => {
            displayKnownFor(artist)
        })
        fetchInforms().then((artist) => {
            displayInforms(artist)
        })
        fetchCombinedCredits().then((artist) => {
            displayCombinedCredits(artist)
            movieHandler()
        })
    }
});