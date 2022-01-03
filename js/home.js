import configs from "./config.js";
const { baseUrl, apiKey, imgUrl } = configs;
export async function fetchPopularMovies() {
  const url = `${baseUrl}popular/?api_key=${apiKey}&language=en-US&page=1`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export function displayData(data) {
  const popularMoviesDom = document.querySelector(".popular__movies");
  let htmlContent = "";
  data.results.forEach((movie) => {
    htmlContent += `<div class="card" data-id = "${movie.id} ">
      <img
        height="250"
        src="${imgUrl}${movie.poster_path}"
        alt="moviezone"
      />
      <h3>${movie.title}</h3>
      </div>`;
  });
  popularMoviesDom.innerHTML = htmlContent;
}

export function setCoverBg(img) {
  const heroDom = document.querySelector(".hero");
  heroDom.style.setProperty("--coverBg", `url(${imgUrl}${img})`);
}

// document.addEventListener("DOMContentLoaded", () => {
//   fetchPopularMovies().then((data) => {
//     displayData(data);
//     setCoverBg(data.results[0].backdrop_path);
//   });
// });

export function movieHandler() {
  let movies = document.querySelectorAll(".card");
  movies.forEach((movie) => {
    movie.onclick = (e) => {
      let id = e.target.parentElement.dataset.id;
      history.pushState({ id }, "movie", "/movie.html");
      location.reload();
    };
  });
}
