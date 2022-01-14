import configs from "../configs.js";
const { API_KEY, BACKEND_API, SESSION_ID, IMG_URL } = configs;

async function fetchDetailsData() {
  const profileUrl = `${BACKEND_API}account?api_key=${API_KEY}&session_id=${SESSION_ID}`;
  const res = await fetch(profileUrl);
  const data = await res.json();
  return data;
}
export async function getWatchList() {
  const watchlistUrl = `${BACKEND_API}account/{account_id}/watchlist/movies?api_key=${API_KEY}&language=en-US&session_id=${SESSION_ID}&sort_by=created_at.asc&page=1`;
  const response = await fetch(watchlistUrl);
  const watchlistData = await response.json();
  console.log(watchlistData);
  return watchlistData;
}
async function DisplayDetails(data) {
  const imgPath = document.querySelector(".img_wrapper");
  const profileName = document.querySelector(".profile_name");
  profileName.innerHTML = `${data.username}`;
  let imgContent = `
    <a href="#"> <img class="profile_pic" src="${IMG_URL}${data.avatar_path}" width="100%" height="100%" alt="" /></a>`;
  imgPath.innerHTML = imgContent;
  console.log(data.avatar_path);
}

export async function profileEvent() {
  const mainMenuContainer = document.querySelector(".main_menu");
  mainMenuContainer.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("watchlist_btn")) {
      this.getWatchList()
    }
  });
}

export function displayData(data) {
  const popularMoviesDom = document.querySelector(".favourite");
  let htmlContent = "";
  data.results.forEach((movie) => {
    htmlContent += `<div class="col-2">
    <img src="https://www.themoviedb.org/t/p/w150_and_h225_bestv2/fSbqPbqXa7ePo8bcnZYN9AHv6zA.jpg"
    alt="">
</div>
<div class="col-9">
    <div class="row">
        <div class="col-1 rating">66%</div>
        <div class="col-8">
            <h4 class="movie_title">${movie.original_title}</h4>
            <p>June 23, 2012</p>
        </div>
    </div>
    <p class="movie_info">Peter Parker is an outcast high schooler abandoned by his parents as a boy, leaving him to be raised by his Uncle Ben and Aunt May. Like most teenagers, Peter is trying to figure out who he is and how he got to be the person he is today. As Peter discovers a mysterious briefcase that belonged to his father, he begins a quest to understand his parents' disappearance – leading him directly to Oscorp and the lab of Dr. Curt Connors, his father's former partner. As Spider-Man is set on a collision</p>
    <div class="row">
        <div class="col-3"> <span class="icon_rating">10</span> Your rating</div>
        <div class="col-3"> <i class="fas fa-heart"></i> Favourite</div>
        <div class="col-3"><i class="fas fa-list-ul"></i> Add to list</div>
        <div class="col-3"><i class="fas icon-remove"></i> Remove</div>
    </div>
</div>`;
  });
  popularMoviesDom.innerHTML = htmlContent;
}
