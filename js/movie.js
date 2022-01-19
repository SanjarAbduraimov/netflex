import configs from "../configs.js";
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
export async function watchlistRequestHandler(id, watchlist) {
  const addToWatchlistUrl = `${BACKEND_API}account/{account_id}/watchlist?api_key=${API_KEY}&session_id=${SESSION_ID}`;
  const bodyData = {
    media_type: "movie",
    media_id: id,
    watchlist,
  };
  const res = await fetch(addToWatchlistUrl, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });
  const data = await res.json();
  return data;
}
export async function fetchIsFavouriteAndWatchlist(id) {
  const favouritesUrl = `${BACKEND_API}movie/${id}/account_states?api_key=${API_KEY}&session_id=${SESSION_ID}`;
  const res = await fetch(favouritesUrl);
  const data = await res.json();
  return data;
}
export async function markAsFavouriteHandler(e, movie_id) {
  await fetchIsFavouriteAndWatchlist(movie_id).then((data) => {
    const { favorite, rated, watchlist } = data;
    if (favorite) {
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
            e.target.style.color = "purple";
          } else {
            alert("Xatolik ");
          }
        })
        .catch((ex) => {
          console.log("Xatolik qo'shilmadi ...", ex);
        });
    }
  });
}
export async function addToWatchlistHandler(e, movie_id) {
  await fetchIsFavouriteAndWatchlist(movie_id).then((data) => {
    const { watchlist } = data;
    if (watchlist) {
      watchlistRequestHandler(movie_id, false)
        .then((param) => {
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
      watchlistRequestHandler(movie_id, true)
        .then((param) => {
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
  });
}
export function displayCreditsData(creditsData) {
    console.log(creditsData);
    let card = document.querySelector(".series");
    let htmlContents = "";
    creditsData.cast.forEach((data) => {
        const imgUrl = data.profile_path ?
            IMG_URL + data.profile_path :
            DEFAULT_IMG;
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

    data.genres.forEach((genre) => {
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