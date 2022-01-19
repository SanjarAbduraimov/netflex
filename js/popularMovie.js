import configs from "../configs.js";
const { API_KEY, BACKEND_API, IMG_URL } = configs;

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
    <div class="card mb-4" data-id="${data.id}"> 
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
    <ul class="hero__actions d-flex flex-column align-items-center list-unstyled bg-white">
    <li class="me-4 my-1">
      <a class="hero__actions-links d-flex align-items-center add__to-list" href="#">
        <i class="fas fa-list text-dark"></i>
        <span class="text-dark fs-6 fw-3">
        Add to list
        </span>
      </a>
    </li>
    <li class="me-4 my-1 mark__as-favourite">
      <a class="hero__actions-links d-flex align-items-center" href="#">
        <i class="fas fa-heart text-dark"></i>
        <span class="text-dark fs-6 fw-3">
        Favourite
        </span>
      </a>
    </li>
    <li class="me-4 my-1 add__to-watchlist">
    <a class="hero__actions-links d-flex align-items-center" href="#">
        <i class="fas fa-bookmark text-dark"></i>
        <span class="text-dark fs-6 fw-3">
        Watchlist
        </span>
      </a>
    </li>
    <li class="me-4 my-1">
      <a class="hero__actions-links d-flex align-items-center" href="#">
        <span class="text-dark fs-6 fw-3">
        <i class="fas fa-star text-dark"></i>
        </span>
        <span class="text-dark fs-6 fw-3">
        Your rating
        </span>
      </a>
    </li>
  </ul>
    <div class="card__link ms-3 mt-3">
      <a
        class="card__link-item text-decoration-none fw-bold text-dark"
        href="/movie.html"
        >${data.title}</a
      >
    </div>
    <div class="card__date ms-3 mb-2">${data.release_date}</div>
  </div>
  `;
  });
  card.innerHTML = htmlContent;
}

export async function searchPopularMovieReq(queryParams) {
  // const url = `${BACKEND_API}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`;
  const url = `${BACKEND_API}discover/movie?api_key=${API_KEY}&${queryParams}`;
  //

  const res = await fetch(url);
  const popularMovie = await res.json();
  return popularMovie;
}

export async function searchHandler() {
  const form = document.querySelector(".filter__panel");
  const formData = new FormData(form);
  const params = new URLSearchParams();
  for (let pair of formData.entries()) {
    params.append(pair[0], pair[1]);
  }
  console.log(params.toString(), "malumot");
  searchPopularMovieReq(params.toString()).then((data) => {
    console.log(data);
    displaySearchResult(data);
  });
}
export async function displaySearchResult(data) {}

// export function cardOptions() {
//   cont
// }

// export function filterName() {
//   if ((filter.style.display = "none")) {
//     filter.style.display = "block";
//     document.querySelector(".filter__name .fa-chevron-right").style.transform =
//       "rotate(90deg)";
//   } else if ((filter.style.display = "block")) {
//     filter.style.display = "none";
//     document.querySelector(
//       ".filter__name span .fa-chevron-right"
//     ).style.transform = "rotate(0deg)";
//   }
// }

// export function filters() {
//   if ((filter2.style.display = "none")) {
//     filter2.style.display = "block";
//     document.querySelector(
//       ".filter__name-2 .fa-chevron-right"
//     ).style.transform = "rotate(90deg)";
//   } else if ((filter2.style.display = "block")) {
//     filter2.style.display = "none";
//     document.querySelector(
//       ".filter__name-2 span .fa-chevron-right"
//     ).style.transform = "rotate(0deg)";
//   }
// }

// export function watch() {
//   let filter = document.querySelector(".filter");
//   // toWatch.addEventListener("click", (e) => {
//   //   e.preventDefault;
//   //   if ((filter3.style.display = "none")) {
//   //     filter3.style.display = "block";
//   //     document.querySelector(
//   //       ".filter__name-3 .fa-chevron-right"
//   //     ).style.transform = "rotate(90deg)";
//   //   } else {
//   //     filter3.style.display = "none";
//   //     document.querySelector(
//   //       ".filter__name-3 .fa-chevron-right"
//   //     ).style.transform = "rotate(90deg)";
//   //   }
//   // });
//   // var coll = document.getElementsByClassName("collapsible");

// }

export function popularMovieHandler() {
  let movies = document.querySelectorAll(".card");
  movies.forEach((movie) => {
    movie.onclick = (e) => {
      let element = e.target;
      let artistWrapperElement = element.closest("[data-id]");
      let id = artistWrapperElement.dataset.id;
      history.pushState({ id }, "movie", "/movie.html");
      location.reload();
    };
  });
}
