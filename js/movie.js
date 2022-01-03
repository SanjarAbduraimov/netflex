let row = document.querySelector(".row");
let card = document.querySelector(".series");
let fon = document.querySelector(".hero")
let  query = new URLSearchParams(location.search);
let queryId = Object.fromEntries(query.entries());
const urls = `https://api.themoviedb.org/3/movie/${queryId.id}?api_key=08469cc05756c025bdd37cef5cd82c74&language=en-US`;
const urlscredits = `https://api.themoviedb.org/3/movie//${queryId.id}/credits?api_key=08469cc05756c025bdd37cef5cd82c74&language=en-US`;

async function fetchFunction() {
  const res = await fetch(urls);
  const data = await res.json();
  console.log(data);
  return data;
}
async function fetchFunctions() {
  const res = await fetch(urlscredits);
  const urlscreditsData = await res.json();
  console.log(urlscreditsData);
  return urlscreditsData;
}
function displayurlscreditsData(urlscreditsData) {
  let htmlContents = "";
  urlscreditsData.cast.forEach((movie) => {
    htmlContents += `
    <li class="card">
    <div class="card-body p-0" data-id="${movie.id}">
    <a href="#">
    <img
      onclick="clickDetails(this)"
      class="card-img"
      src="https://image.tmdb.org/t/p/w500/${movie.profile_path}"
      alt="series-img"
    />
    </a>
    <div class="ms-2 card-title fw-bold mb-0">
      <a
        class="text-decoration-none text-dark mt-2 d-inline-block"
        href="#"
      >
        ${movie.original_name}
      </a>
    </div>
    <p class="card-text ms-2 card-text mb-0">${movie.character}</p>
  </div>
  </li>`;
  });
  card.innerHTML = htmlContents;
}

// fon.style.background = url(`https://image.tmdb.org/t/p/w500/${data.poster_path}`)
function displayData(data) {
  let htmlContent = `<div class="col-4">
  <a href="#">
    <img
      class="hero__img w-100"
      src="https://image.tmdb.org/t/p/w500/${data.poster_path}"
      alt="hero__img"
    />
  </a>
</div>
<div class="col-8 ps-4">
  <a class="text-decoration-none text-light" href="#">
    <h1>
      <span> ${data.original_title}</span>
      <span class="fw-light"> (2021) </span>
    </h1>
  </a>
  <ul class="d-flex align-items-center justify-content-start">
    <li class="list-unstyled me-1 text-light lead">${data.release_date}</li>
    <li class="list-unstyled me-1">
     ${data.production_countries[0].iso_3166_1}
    </li>
    <li class="list-unstyled me-1">
      <a class="text-light" href="#"> ${data.genres[0].name}, </a>
    </li>
    <li class="list-unstyled me-1">
      <a class="text-light" href="#"> ${data.genres[1].name}, </a>
    </li>
    <li class="list-unstyled me-1">
      <a class="text-light" href="#"> ${data.genres[2].name}, </a>
    </li>
    <li class="ms-4 text-light">${String(data.runtime / 60).slice(0,String(data.runtime / 60).indexOf('.')) }h ${data.runtime % 60}m</li>
  </ul>
  <ul class="hero__actions d-flex align-items-center list-unstyled">
    <li class="percent d-flex align-items-center me-4">
      <div>81%</div>
      <p
        class="
          ms-2
          text-capitalize text-light
          d-flex
          align-items-center
          my-auto
          fw-bold
        "
      >
        user <br />
        score
      </p>
    </li>
    <li class="me-4">
      <a class="hero__actions-links" href="#">
        <i class="fas fa-list text-light"></i>
      </a>
    </li>
    <li class="me-4">
      <a class="hero__actions-links" href="#">
        <i class="fas fa-heart text-light"></i>
      </a>
    </li>
    <li class="me-4">
      <a class="hero__actions-links" href="#">
        <i class="fab fa-watchman-monitoring text-light"></i>
      </a>
    </li>
    <li class="me-4">
      <a class="hero__actions-links" href="#">
        <i class="fas fa-star text-light"></i>
      </a>
    </li>
    <li class="me-4">
      <a
        class="
          text-capitalize text-decoration-none text-light
          fw-bold
        "
        href="#"
      >
        play trailer
      </a>
    </li>
  </ul>
  <h5 class="text-capitalize text-light">overview</h5>
  <p class="text-light" style="line-height: 1.3">
    ${data.overview}
  </p>
  <div class="author">
    <a
      class="
        text-capitalize
        fw-bold
        text-light text-decoration-none
      "
      href="#"
      >rafe judkins</a
    >
    <p class="text-light">Creator</p>
  </div>
</div>`;
  row.innerHTML = htmlContent;
}

document.addEventListener("DOMContentLoaded", () => {
  fetchFunction().then((data) => {
    displayData(data);
  });
  fetchFunctions().then((data) => {
    displayurlscreditsData(data);
  });
});


function clickDetails(e) {
  movId = e.parentElement.dataset.id;
  location.assign("details.html?id=" + movId)
}