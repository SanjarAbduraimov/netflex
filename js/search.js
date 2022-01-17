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
  const { results } = data;
  const searchResult = document.querySelector(".searchResults");
  let html = "";
  results?.forEach((movie) => {
    const { id, title, overview, release_date, poster_path } = movie;
    const imgUrl = poster_path ? IMG_URL + poster_path : DEFAULT_IMG;
    html += `
    <div class="col-12">
      <div class="card" data-id="${id}">
        <div class="row">
          <div class="col-2"><img width="100%" src="${imgUrl}" alt="#"></div>
          <div class="col-10">
            <h3 class="h3">${title}</h3>
            <p class="text-muted">${release_date}</p>
            <p>${overview}</p>
          </div>
        </div>
      </div>
    </div>
  `;
  });
  searchResult.innerHTML = html;
}
