import configs from "./config.js";
const { apiKey, baseUrl, imgUrl } = configs;

export async function fetchMovie(id) {
  const urls = `${baseUrl}/${id}?api_key=${apiKey}&language=en-US`;

  const res = await fetch(urls);
  const data = await res.json();
  return data;
}
export async function fetchCredits(id) {
  const creditsUrl = `${baseUrl}${id}/credits?api_key=${apiKey}&language=en-US`;

  const res = await fetch(creditsUrl);
  const data = await res.json();
  return data;
}
export function displayCreditsData(creditsData) {
  let card = document.querySelector(".series");

  let htmlContents = "";
  creditsData.cast.forEach((movie) => {
    htmlContents += `
    <li class="card">
    <div class="card-body p-0" data-id="${movie.id}">
    <a href="#">
    <img
      onclick="clickDetails(this)"
      class="card-img"
      src="${imgUrl}${movie.profile_path}"
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

export function displayData(data) {
  let row = document.querySelector(".row");

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
    <li class="ms-4 text-light">${String(data.runtime / 60).slice(
      0,
      String(data.runtime / 60).indexOf(".")
    )}h ${data.runtime % 60}m</li>
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

// document.addEventListener("DOMContentLoaded", () => {
//   fetchFunction().then((data) => {
//     displayData(data);
//   });
//   fetchFunctions().then((data) => {
//     displayurlscreditsData(data);
//   });
// });

export function clickDetails(e) {
  movId = e.parentElement.dataset.id;
  location.assign("details.html?id=" + movId);
}
