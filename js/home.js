const popularMoviesDom = document.querySelector(".popular__movies");
const heroDom = document.querySelector(".hero");

const url = `https://api.themoviedb.org/3/movie/popular/?api_key=7014e2cdb739f65a296e51932f359f53&language=en-US&page=1`;

async function fetchPopularMovies() {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

function displayData(data) {
  let htmlContent = "";
  console.log(data);
  data.results.forEach((movie) => {
    htmlContent += `<div class="card" data-id="${movie.id}" onclick="getMovie(this)">
      <img
        height="250"
        src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
        alt="moviezone"
      />
      <h3>${movie.title}</h3>
      </div>`;
  });
  popularMoviesDom.innerHTML = htmlContent;
}


function getMovie(e){
  history.pushState({id : e.dataset.id}, "title", "/details.html")
  // console.log(history.pushState);
  location.assign(`/movie.html`)
}


document.addEventListener("DOMContentLoaded", () => {

  fetchPopularMovies().then((data) => {
    displayData(data);
  });
});

