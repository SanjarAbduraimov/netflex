import configs from "../configs.js";
import { showLoader } from "./loader.js";
const { API_KEY, BACKEND_API, IMG_URL, DEFAULT_IMG, SESSION_ID } = configs;

export async function fetchMovie(id) {
  const urls = `${BACKEND_API}/movie/${id}?api_key=${API_KEY}&language=en-US`;
  const res = await fetch(urls);
  const data = await res.json();
  return data;
}
export async function fetchCredits(id) {
  const creditsUrl = `${BACKEND_API}movie/${id}/credits?api_key=${API_KEY}&language=en-US`;
  const res = await fetch(creditsUrl);
  const data = await res.json();
  return data;
}

export async function addTolist(e) {
  // const addList = document.querySelector(".add__to-list");
  // document.addEventListener((e) => {
  const tooltip = document.querySelector(".tooltip");
  tooltip.style.display = "contents";
  // });
}

export async function favouriteRequestHandler(id, favorite) {
  const markAsFavouriteUrl = `${BACKEND_API}account/{account_id}/favorite?api_key=${API_KEY}&session_id=${SESSION_ID}`;
  const bodyData = {
    media_type: "movie",
    media_id: id,
    favorite,
  };
  const res = await fetch(markAsFavouriteUrl, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });
  const data = await res.json();
  return data;
}

export async function isFavourite(id) {
  const favouritesUrl = `${BACKEND_API}/account/{account_id}/favorite/movies?api_key=${API_KEY}&session_id=${SESSION_ID}&language=en-US&sort_by=created_at.asc&page=1`;

  const res = await fetch(favouritesUrl);
  const data = await res.json();
  console.log(data, "wdhuwhuhsduhudh");
  let result = data?.results.find((favourite) => {
    return favourite.id == id;
  });
  console.log(data, result, "isFavourite");
  if (!result) {
    return false;
  }
  return true;
}

export async function markAsFavouriteHandler(e, movie_id) {
  let isFavouriteMovie;
  await isFavourite(movie_id).then((data) => {
    console.log();
    isFavouriteMovie = data;
  });
  console.log(isFavouriteMovie, "is favouritedan nima qaytishi");
  if (isFavouriteMovie) {
    favouriteRequestHandler(movie_id, false)
      .then((param) => {
        console.log(movie_id, param, "markAsFavouriteHandler1");
        if (param.success) {
          console.log(e.target);
          e.target.style.color = "white";
        } else {
          alert("Xatolik ");
        }
      })
      .catch((ex) => {
        console.log("Xatolik ...", ex);
      });
  } else {
    favouriteRequestHandler(movie_id, true)
      .then((param) => {
        console.log(movie_id, param, "markAsFavouriteHandler2");
        if (param.success) {
          e.target.style.color = "red";
        } else {
          alert("Xatolik ");
        }
      })
      .catch((ex) => {
        console.log("Xatolik qo'shilmadi ...", ex);
      });
  }
}

export async function addToWatchlistRequest(id, watchlist) {
  const addtoWatchlistUrl = `${BACKEND_API}account/{account_id}/watchlist?api_key=${API_KEY}&session_id=${SESSION_ID}`;
  const bodyData = {
    media_type: "movie",
    media_id: id,
    watchlist,
  };
  const res = await fetch(addtoWatchlistUrl, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });
  const data = await res.json();
  return data;
}

export async function isWatchList(id) {
  const watchlistUrl = `${BACKEND_API}/account/{account_id}/watchlist/movies?api_key=${API_KEY}&session_id=${SESSION_ID}&language=en-US&sort_by=created_at.asc&page=1`;

  const res = await fetch(watchlistUrl);
  const data = await res.json();
  console.log(data, "wdhuwhuhsduhudh");
  let result = data?.results.find((watchlist) => {
    return watchlist.id == id;
  });
  console.log(data, result, "isWatchList");
  if (!result) {
    return false;
  }
  return true;
}

export async function addToWatchlistHandler(e, movie_id) {
  let isWatchlistMovie;
  await isWatchList(movie_id).then((data) => {
    console.log();
    isWatchlistMovie = data;
  });
  console.log(isWatchlistMovie, "is watchlistdan nima qaytishi");
  if (isWatchlistMovie) {
    addToWatchlistRequest(movie_id, false)
      .then((param) => {
        console.log(movie_id, param, "addToWatchlistRequest1");
        if (param.success) {
          console.log(e.target);
          e.target.style.color = "white";
        } else {
          alert("Xatolik ");
        }
      })
      .catch((ex) => {
        console.log("Xatolik ...", ex);
      });
  } else {
    addToWatchlistRequest(movie_id, true)
      .then((param) => {
        // console.log(movie_id, param, "addToWatchlistRequest2");
        if (param.success) {
          e.target.style.color = "red";
        } else {
          alert("Xatolik ");
        }
      })
      .catch((ex) => {
        console.log("Xatolik qo'shilmadi ...", ex);
      });
  }
}

export async function addToWatchlist(id) {
  const addToWatchlistUrl = `https://api.themoviedb.org/3/account/{account_id}/watchlist?api_key=${API_KEY}&session_id=${SESSION_ID}`;
  const bodyData = {
    media_type: "movie",
    media_id: "id",
    watchlist: true,
  };
  const res = await fetch(addToWatchlistUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });
  const data = await res.json();
  return data;
}

export async function markAsFavourite(id) {
  const markAsFavouriteUrl = `https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=${API_KEY}&session_id=${SESSION_ID}`;
  const bodyData = {
    media_type: "movie",
    media_id: "id",
    favorite: true,
  };
  const res = await fetch(markAsFavouriteUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });
  const data = await res.json();
  return data;
}

export function displayCreditsData(creditsData) {
  console.log(creditsData);
  let card = document.querySelector(".series");
  let htmlContents = "";
  creditsData.cast.forEach((data) => {
    const imgUrl = data.profile_path
      ? IMG_URL + data.profile_path
      : DEFAULT_IMG;
    htmlContents += `
    <li class="card">
    <div class="card-body p-0" data-id="${data.id}">
    <img
      class="card-img"
      src="${imgUrl}"
      alt="series-img"
    />
    <div class="ms-2 card-title fw-bold mb-0">
      <a
        class="text-decoration-none text-dark mt-2 d-inline-block"
        href="#"
      >
        ${data.original_name}
      </a>
    </div>
    <p class="card-text ms-2 card-text mb-0">${data.character}</p>
  </div>
  </li>`;
  });
  card.innerHTML = htmlContents;
}

export function displayData(data) {
  const imgWrapper = document.querySelector(".hero__img-wrapper");
  const movieTitle = document.querySelector(".movie__title");
  let movieGenres = document.querySelector(".movie__genres");
  const movieOverview = document.querySelector(".movie__overview");

  const imgContent = `
  <a href="#">
    <img class="hero__img w-100" src="${IMG_URL}${data.poster_path}" alt="hero__img" />
  </a>`;
  const movieTitleContent = `
  <span>${data.original_title}</span>
  <span class="fw-light">(2021)</span>`;
  const movieGenresContent = `
  <li class="list-unstyled me-1 text-light lead">${data.release_date}</li>
  <li class="list-unstyled me-1">${data.production_countries[0].iso_3166_1}</li>`;

  imgWrapper.innerHTML = imgContent;
  movieTitle.innerHTML = movieTitleContent;
  movieGenres.innerHTML = movieGenresContent;

  data?.genres.forEach((genre) => {
    movieGenres.innerHTML += `
      <li class="list-unstyled me-1">
        <a class="text-light" href="#" data-id="${genre.id}">
          ${genre.name}
        </a>
      </li>
    `;
    console.log(movieGenres);
  });
  movieGenres += `
    <li class="ms-4 text-light">
      ${String(data.runtime / 60).slice(
        0,
        String(data.runtime / 60).indexOf(".")
      )}
      h ${data.runtime % 60}m
    </li>
  `;

  movieOverview.innerText = data.overview;
}

export function artistHandler() {
  let artists = document.querySelectorAll(".card-body");
  artists.forEach((artist) => {
    artist.onclick = (e) => {
      let element = e.target;
      let artistWrapperElement = element.closest("[data-id]");
      let id = artistWrapperElement.dataset.id;
      console.log(element, id);
      history.pushState({ id }, "artist", "/artist.html");
      location.reload();
    };
  });
}
