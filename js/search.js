import configs from "../configs.js";
// import * as movie from "./home.js";
const { API_KEY, BACKEND_API, IMG_URL, DEFAULT_IMG, SESSION_ID } = configs;

export async function fetchSearchMovie(query, page = 1) {
  const url = `${BACKEND_API}search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`;
  console.log(url, "fghjtrertyu");
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export function displaySearchResults(data) {
  const { results,total_results } = data;
  const searchResult = document.querySelector(".searchResults");
  const paginations = document.querySelector(".pagination")
  displaySearchResults2(total_results)
  let html = "",index=2;

  let pagination = `
  <li data-id="${1}" class="page-item active" aria-current="page">
  <span class="page-link">1</span>
  </li>
`;

for(let i=2;i<=data.total_pages;i++){
  pagination+=`
  <li data-id="${index}" class="page-item"><a class="page-link" href="#">${i}</a></li>
  `
}

index++;

  results?.forEach((movie) => {
    const { id, title, overview, release_date, poster_path } = movie;
    const imgUrl = poster_path ? IMG_URL + poster_path : DEFAULT_IMG;
    html += `
    <div class="col-12">
    <div class="card" data-id="${id}">
    <div class="row">
    <div class="col-2"><img  data-id="${id}" width="100%" class="carde" src="${imgUrl}" alt="#"></div>
    <div class="col-10">
    <h3 data-id="${id}" class="h3 carde" style="cursor:pointer; width: max-content;">${title}</h3>
    <p class="text-muted">${release_date}</p>
    <p>${overview}</p>
    </div>
    </div>
    </div>
    </div>
    `;
  });
  searchResult.innerHTML = html;
  paginations.innerHTML = pagination;
  movieHandler1()
}

export function movieHandler1() {
  let movies = document.querySelectorAll(".carde");
  movies.forEach((movie) => {
    movie.onclick = (e) => {
      let id = e.target.dataset.id;
      history.pushState({ id }, "movie", "/movie.html");
      location.reload();
    };
  });
}
export function thisPagination() {
  let page = document.querySelectorAll(".page-item");
  page.forEach((movie) => {
    page.onclick = (e) => {
      let id = e.target.dataset.id;
      history.pushState({ id }, "movie", "/movie.html");
      location.reload();
    };
  });
}


export function displaySearchResults2(total_results) {
  const searchResult = document.querySelector(".cards");
  console.log(total_results);
  
  let html = `
  <div class="card-header text-white bg-primary" style="font-size: 2rem;">Search Results</div>
  <ul class=" card-body text-start">
    <li class="list-group-item" style="cursor: pointer; display: flex; justify-content: space-between;">Movies <span class=" badge rounded-pill bg-primary">${total_results}</span></li>
    <li class="list-group-item" style="cursor: pointer; display: flex; justify-content: space-between;">TV Shows<span class=" badge rounded-pill bg-primary">Primary</span></li>
    <li class="list-group-item" style="cursor: pointer; display: flex; justify-content: space-between;">People<span class=" badge rounded-pill bg-primary">Primary</span></li>
    <li class="list-group-item" style="cursor: pointer; display: flex; justify-content: space-between;">Companies<span class=" badge rounded-pill bg-primary">Primary</span></li>
    <li class="list-group-item" style="cursor: pointer; display: flex; justify-content: space-between;">Keywords<span class=" badge rounded-pill bg-primary">Primary</span></li>
    <li class="list-group-item" style="cursor: pointer; display: flex; justify-content: space-between;">Collections<span class=" badge rounded-pill bg-primary">Primary</span></li>
    <li class="list-group-item" style="cursor: pointer; display: flex; justify-content: space-between;">Networks<span class=" badge rounded-pill bg-primary">Primary</span></li>
  </ul>
  `;
  ;
  searchResult.innerHTML = html;
}

