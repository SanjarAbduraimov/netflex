import configs from "../configs.js";
const { BACKEND_API, API_KEY, IMG_URL } = configs;
export async function fetchPopularMovies() {
    const url = `${BACKEND_API}movie/popular/?api_key=${API_KEY}&language=en-US&page=1`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export function displayData(data) {
    const popularMoviesDom = document.querySelector(".popular__movies");
    let htmlContent = "";
    data.results.forEach((movie) => {
        htmlContent += `<div data-aos="fade-up"
        data-aos-anchor-placement="top-bottom" class="card" data-id = "${movie.id} ">
      <img
        height="250"
        src="${IMG_URL}${movie.poster_path}"
        alt="moviezone"
      />
      <h3>${movie.title}</h3>
      </div>`;
    });
    popularMoviesDom.innerHTML = htmlContent;
}

export function setCoverBg(img) {
    const heroDom = document.querySelector(".hero");
    heroDom.style.setProperty("--coverBg", `url(${IMG_URL}${img})`);
}

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