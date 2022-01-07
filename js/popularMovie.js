import configs from "../configs.js";
const { API_KEY, BACKEND_API, IMG_URL } = configs;

let filter = document.querySelector(".filter");
let filter2 = document.querySelector(".filter2");
let filter3 = document.querySelector(".filter3");

export async function fetchPopularMovie() {
  const url = `${BACKEND_API}movie/popular/?api_key=${API_KEY}&language=en-US&page=1`;
  const res = await fetch(url);
  const popularMovie = await res.json();
  return popularMovie;
}

export function displayPopularMovie(data) {
  let card = document.querySelector(".hero__content");
  let htmlContent = "";
  data.results.forEach((data) => {
  htmlContent += `
    <div class="card mb-4"> 
    <div class="card__img">
      <img
        class="card__img-item w-100 h-100"
        src="${IMG_URL}${data.poster_path}"
        alt="movie"
      />
    </div>
    <div class="card__options">
      <div class="card__options-item">
        <i class="fas fa-circle"></i>
        <i class="fas fa-ellipsis-h"></i>
      </div>
    </div>
    <div class="card__link ms-3 mt-3">
      <a
        class="card__link-item text-decoration-none fw-bold text-dark"
        href="#"
        >${data.title}</a
      >
    </div>
    <div class="card__date ms-3 mb-2">${data.release_date}</div>
  </div>
  `;
  });
  card.innerHTML = htmlContent;
}

// let filterName = document.querySelector(".filter__name");

// filterName.onclick =  () => {
//   if ((filter.style.display = "none")) {
//     filter.style.display = "block";
//     document.querySelector(".filter__name fa-chevron-right").style.transform =
//       "rotate(90deg)";
//   } else if ((filter.style.display = "block")) {
//     filter.style.display = "none";
//     document.querySelector(
//       ".filter__name span fa-chevron-right"
//     ).style.transform = "rotate(0deg)";
//   }
// }

export function filterName() {
  if ((filter.style.display = "none")) {
    filter.style.display = "block";
    document.querySelector(".filter__name fa-chevron-right").style.transform =
      "rotate(90deg)";
  } else if ((filter.style.display = "block")) {
    filter.style.display = "none";
    document.querySelector(
      ".filter__name span fa-chevron-right"
    ).style.transform = "rotate(0deg)";
  }
}

export function filters() {
  if ((filter2.style.display = "none")) {
    filter2.style.display = "block";
    document.querySelector(".filter__name-2 fa-chevron-right").style.transform =
      "rotate(90deg)";
  } else if ((filter2.style.display = "block")) {
    filter2.style.display = "none";
    document.querySelector(
      ".filter__name-2 span fa-chevron-right"
    ).style.transform = "rotate(0deg)";
  }
}

export function toWatch() {
  if ((filter3.style.display = "none")) {
    filter3.style.display = "block";
    document.querySelector(".filter__name-3 fa-chevron-right").style.transform =
      "rotate(90deg)";
  } else if ((filter3.style.display = "block")) {
    filter3.style.display = "none";
    document.querySelector(
      ".filter__name-3 span fa-chevron-right"
    ).style.transform = "rotate(0deg)";
  }
}
