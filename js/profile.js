import configs from "../configs.js";
const { API_KEY, BACKEND_API, SESSION_ID, IMG_URL } = configs;

export async function fetchDetailsData() {
  const profileUrl = `${BACKEND_API}account?api_key=${API_KEY}&session_id=${SESSION_ID}`;
  const res = await fetch(profileUrl);
  const accountData = await res.json();
  return accountData;
}
export async function getWatchList() {
  const watchlistUrl = `${BACKEND_API}account/{account_id}/watchlist/movies?api_key=${API_KEY}&language=en-US&session_id=${SESSION_ID}&sort_by=created_at.asc&page=1`;
  const response = await fetch(watchlistUrl);
  const watchlistData = await response.json();
  console.log(watchlistData, 61428438);
  return watchlistData;
}
export async function getFavourite() {
  const watchlistUrl = `${BACKEND_API}/account/{account_id}/favorite/movies?api_key=${API_KEY}&session_id=${SESSION_ID}&language=en-US&sort_by=created_at.asc&page=1`;
  const response = await fetch(watchlistUrl);
  const favouriteData = await response.json();
  console.log(favouriteData, 555);
  return favouriteData;
}
export function displayFavouriteData(favouriteData) {
  const favMovieDom = document.querySelector(".fav_body");
  const totalWatchlsit = document.querySelector(".total__favourites");
  const myFavourites = document.querySelector(".fav_header");
  let htmlTotalWatchlistContent = "";
  let htmlWatchlistContent = "";
  htmlTotalWatchlistContent += `
    <h3 class="stat_title">Total Favourites</h3>
    <h2 class="edit_data">${favouriteData.total_results}</h2>`;
  favouriteData.results.forEach((movie) => {
    htmlWatchlistContent += `
    <div class="fav_movie row p-3 m-3">
    <div class="col-2">
        <img src="${IMG_URL}${movie.backdrop_path}"
        height="100%"
        width = "100%"
        alt="">
    </div>
    <div class="col-9">
        <div class="row">
            <div class="col-1 rating">${movie.vote_average}</div>
            <div class="col-8">
                <h4 class="movie_title">${movie.original_title}</h4>
                <p>June 23, 2012</p>
            </div>
        </div>
        <p class="movie_info">${movie.overview}</p>
        <div class="row">
            <div class="col-3"> <span class="icon_rating">10</span> Your rating</div>
            <div class="col-3"> <i class="fas fa-heart"></i> Favourite</div>
            <div class="col-3"><i class="fas fa-list-ul"></i> Add to list</div>
            <div class="col-3"><i class="fas icon-remove"></i> Remove</div>
        </div>
      </div>
</div>`;
  });
  totalWatchlsit.innerHTML = htmlTotalWatchlistContent;
  favMovieDom.innerHTML = htmlWatchlistContent;
  myFavourites.innerHTML = `<h2 class="fav_title">My Favourites</h2>`
}
export async function DisplayDetails(accountData) {
  const imgPath = document.querySelector(".img_wrapper");
  const profileName = document.querySelector(".profile_name");
  profileName.innerHTML = `${accountData.username}`;
  let imgContent = `
    <a href="#"> <img class="profile_pic" src="${
      accountData.avatar.tmdb.avatar_path
        ? IMG_URL + accountData.avatar.tmdb.avatar_path
        : "./assets/img/icons/img-thumbnail.svg"
    }" width="100%" height="100%" alt="" /></a>`;
  imgPath.innerHTML = imgContent;
}
export async function profileEvent() {
  const mainMenuContainer = document.querySelector(".main_menu");
  mainMenuContainer.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("watchlist_btn")) {
      console.log("getwatch");
      getWatchList().then((data) => {
        displayWatchlistData(data);
      });
    }
    if (e.target.classList.contains("favourite_btn")) {
      console.log("getfav");
      getFavourite().then((data) => {
        displayFavouriteData(data);
      });
    }
  });

  displayWatchlistData();
}
export function displayWatchlistData(watchlistData) {
  const favMovieDom = document.querySelector(".fav_body");
  const myWatchlists = document.querySelector(".fav_header");
  const totalWatchlist = document.querySelector(".total__watchlists");
  let htmlWatchlistContent = "";
  let htmlContent = "";
  htmlWatchlistContent += `
    <h3 class="stat_title">Total Watchlists</h3>
    <h2 class="edit_data">${watchlistData.total_results}</h2>`;
  watchlistData.results.forEach((movie) => {
    htmlContent += `
    <div class="fav_movie row p-3 m-3">
    <div class="col-2">
        <img src="${IMG_URL}${movie.backdrop_path}"
        height="100%"
        width = "100%"
        alt="">
    </div>
    <div class="col-9">
        <div class="row">
            <div class="col-1 rating">${movie.vote_average * 10}%</div>
            <div class="col-8">
                <h4 class="movie_title">${movie.original_title}</h4>
                <p>${movie.release_date}</p>
            </div>
        </div>
        <p class="movie_info">${movie.overview}</p>
        <div class="row">
            <div class="col-3"> <span class="icon_rating">10</span> Your rating</div>
            <div class="col-3"> <i class="fas fa-heart"></i> Favourite</div>
            <div class="col-3"><i class="fas fa-list-ul"></i> Add to list</div>
            <div class="col-3"><i class="fas icon-remove"></i> Remove</div>
        </div>
      </div>
</div>`;
  });
  totalWatchlist.innerHTML = htmlWatchlistContent;
  favMovieDom.innerHTML = htmlContent;
  myWatchlists.innerHTML = `<h2 class="fav_title">My Watchlists</h2>`;
}
