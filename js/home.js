const popularMoviesDom = document.querySelector(".popular__movies");
const heroDom = document.querySelector(".hero");
let movId;
const url = `https://api.themoviedb.org/3/movie/popular?api_key=08469cc05756c025bdd37cef5cd82c74&language=en-US&page=1`;

async function fetchPopularMovies() {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  return data;
}

function displayData(data) {
  let htmlContent = "";
  data.results.forEach((movie) => {
    htmlContent += `<div class="card" data-id = "${movie.id} ">
      <img
        onclick="clickMovie(this)"
        height="250"
        src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
        alt="moviezone"
      />
      <h3>${movie.title}</h3>
      </div>`;
  });
  popularMoviesDom.innerHTML = htmlContent;
}

function setCoverBg(img) {
  heroDom.style.setProperty(
    "--coverBg",
    `url(https://image.tmdb.org/t/p/w500/${img})`
  );
}

document.addEventListener("DOMContentLoaded", () => {
  fetchPopularMovies().then((data) => {
    displayData(data);
    setCoverBg(data.results[0].backdrop_path);
  });
});

function clickMovie(e) {
  movId = e.parentElement.dataset.id;
  location.assign("movie.html?id=" + movId)
}

