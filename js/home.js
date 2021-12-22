import configs from "../configs.js";
const { API_KEY, BACKEND_API, DEFAULT_IMG } = configs;
export async function fetchMovies(page = 1) {
  try {
    const res = await fetch(
      `${BACKEND_API}movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    return await res.json();
  } catch (error) {
    let ifConnected = window.navigator.onLine;
    if (!ifConnected) {
      return getMoviesFromStorage();
    }
  }
}

function getMoviesFromStorage() {
  return localStorage.getItem("movies")
    ? JSON.parse(localStorage.getItem("movies"))
    : [];
}

function nextPage() {
  page = page + 1;
}

export function displayMovies(movies) {
  let popular__movies = document.querySelector(".popular__movies");

  let result = "";
  const { results } = movies;
  results.map((movie) => {
    const { id, title, poster_path, release_date } = movie;
    let img = poster_path
      ? `https://image.tmdb.org/t/p/w500/${poster_path}`
      : DEFAULT_IMG;
    result += `<div data-id="${id}" class="card">
    <img height="250" title="${title}" src="${img}" alt="${title}">
    <h2>
      <a href="/details.html">${title}</a>
    </h2>
    <span>${release_date}</span>
    </div>
    `;
  });
  popular__movies.innerHTML = result;
}

async function search(formData) {
  try {
    let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${formData}`;
    let res = await fetch(searchUrl);
    let data = await res.json();
    let movies = data.results;
    movies = movies.map((i) => {
      let { id, title, overview, vote_average, release_date, poster_path } = i;
      return { id, title, overview, vote_average, release_date, poster_path };
    });
    return movies;
  } catch (error) {
    console.log(error.message);
  }
}

// let search__movie = document.getElementById("search__movie");
// search__movie.addEventListener("cuechange", (e) => {
//   console.log(e);
// });

export function saveData(data) {
  localStorage.setItem("movies", JSON.stringify(data));
}

export function movieEvents() {
  let moviesNode = document.querySelectorAll(".popular__movies .card");
  moviesNode.forEach((item) => {
    item.onclick = (e) => {
      e.preventDefault();
      history.pushState(
        { id: item.dataset.id },
        location.pathname,
        location.origin + "/details.html"
      );
      // window.dispatchEvent(new Event("popstate"));
      location.assign("/details.html");
    };
  });
}

// function saveData(data) {
//   localStorage.setItem("movies", JSON.stringify(data));
// }
