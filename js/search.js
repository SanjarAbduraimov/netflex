import configs from "../configs.js";
// import * as movie from "./home.js";
const { API_KEY, BACKEND_API, IMG_URL, DEFAULT_IMG, SESSION_ID } = configs;

export async function fetchSearchMovie(query, page = 1) {
  const url = `${BACKEND_API}search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export function displaySearchResults(data) {
  const { results, total_results, total_pages, page } = data;
  const searchResult = document.querySelector(".searchResults");
  const paginations = document.querySelector(".pagination");
  displaySearchResults2(total_results);
  let html = "";

  let pagination = "";

  for (let i = 1; i <= data.total_pages; i++) {
    pagination += `
    <li data-id="${i}" class="page-item ${
      i === page ? "active" : ""
    }"><span class="page-link">${i}</span></li>
    `;
  }

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
  movieHandler1();
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
export function paginationHandler(history, location) {
  let pageNodeList = document.querySelectorAll(".page-item");
  console.log(history.state, "state");
  pageNodeList.forEach((item) => {
    item.onclick = (e) => {
      let element = e.target;
      let paginationWrapperElement = element.closest("[data-id]");
      let page = paginationWrapperElement.dataset.id;
      console.log(page, "page");
      history.replaceState(
        { query: history.state.query, page },
        "search",
        "/search.html"
      );
      location.reload();

      // fetchSearchMovie(query, page).then((data) => {
      //   console.log("");
      //   displaySearchResults(data);
      // });
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
  searchResult.innerHTML = html;
}
